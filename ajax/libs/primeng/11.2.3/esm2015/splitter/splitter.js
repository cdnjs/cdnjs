import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, ElementRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
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
        this.dragging = false;
        this.mouseMoveListener = null;
        this.mouseUpListener = null;
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
        this.startPos = this.horizontal() ? event.pageX : event.pageY;
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
        this.onResizeStart(event, index);
        event.preventDefault();
    }
    onGutterTouchMove(event) {
        this.onResize(event);
        event.preventDefault();
    }
    onGutterTouchEnd(event) {
        this.resizeEnd(event);
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
Splitter.decorators = [
    { type: Component, args: [{
                selector: 'p-splitter',
                template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-template ngFor let-panel let-i="index" [ngForOf]="panels">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div class="p-splitter-gutter" *ngIf="i !== (panels.length - 1)" [ngStyle]="gutterStyle()" 
                    (mousedown)="onGutterMouseDown($event, i)" (touchstart)="onGutterTouchStart($event, i)" (touchmove)="onGutterTouchMove($event, i)" (touchend)="onGutterTouchEnd($event, i)">
                    <div class="p-splitter-gutter-handle"></div>
                </div>
            </ng-template>
        </div>
    `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.p-splitter-panel-nested]': 'nested'
                },
                styles: [".p-splitter{display:flex;flex-wrap:nowrap}.p-splitter-vertical{flex-direction:column}.p-splitter-panel{flex-grow:1}.p-splitter-panel-nested{display:flex}.p-splitter-panel p-splitter{flex-grow:1}.p-splitter-panel .p-splitter{border:0;flex-grow:1}.p-splitter-gutter{align-items:center;cursor:col-resize;display:flex;flex-grow:0;flex-shrink:0;justify-content:center}.p-splitter-horizontal.p-splitter-resizing{-ms-user-select:none;-webkit-user-select:none;cursor:col-resize;user-select:none}.p-splitter-horizontal>.p-splitter-gutter>.p-splitter-gutter-handle{height:24px;width:100%}.p-splitter-horizontal>.p-splitter-gutter{cursor:col-resize}.p-splitter-vertical.p-splitter-resizing{-ms-user-select:none;-webkit-user-select:none;cursor:row-resize;user-select:none}.p-splitter-vertical>.p-splitter-gutter{cursor:row-resize}.p-splitter-vertical>.p-splitter-gutter>.p-splitter-gutter-handle{height:100%;width:24px}"]
            },] }
];
Splitter.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
Splitter.propDecorators = {
    styleClass: [{ type: Input }],
    panelStyleClass: [{ type: Input }],
    style: [{ type: Input }],
    stateStorage: [{ type: Input }],
    stateKey: [{ type: Input }],
    layout: [{ type: Input }],
    gutterSize: [{ type: Input }],
    panelSizes: [{ type: Input }],
    minSizes: [{ type: Input }],
    onResizeEnd: [{ type: Output }],
    panels: [{ type: ContentChildren, args: [TemplateRef,] }],
    containerViewChild: [{ type: ViewChild, args: ['container', { static: false },] }]
};
export class SplitterModule {
}
SplitterModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Splitter],
                declarations: [Splitter]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3NwbGl0dGVyLyIsInNvdXJjZXMiOlsic3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBYSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBd0J6QyxNQUFNLE9BQU8sUUFBUTtJQW9EakIsWUFBbUIsRUFBcUIsRUFBVSxFQUFjO1FBQTdDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTVDdkQsaUJBQVksR0FBVyxTQUFTLENBQUM7UUFFakMsYUFBUSxHQUFXLElBQUksQ0FBQztRQUV4QixXQUFNLEdBQVcsWUFBWSxDQUFDO1FBRTlCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUUxQixhQUFRLEdBQWEsRUFBRSxDQUFDO1FBRXZCLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNOUQsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBRXpCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUVyQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBRWhCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUV4QixxQkFBZ0Is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QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3RvclJlZiwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc3BsaXR0ZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1wYW5lbCBsZXQtaT1cImluZGV4XCIgW25nRm9yT2ZdPVwicGFuZWxzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJwYW5lbENvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwicGFuZWxTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYW5lbFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNwbGl0dGVyLWd1dHRlclwiICpuZ0lmPVwiaSAhPT0gKHBhbmVscy5sZW5ndGggLSAxKVwiIFtuZ1N0eWxlXT1cImd1dHRlclN0eWxlKClcIiBcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbkd1dHRlck1vdXNlRG93bigkZXZlbnQsIGkpXCIgKHRvdWNoc3RhcnQpPVwib25HdXR0ZXJUb3VjaFN0YXJ0KCRldmVudCwgaSlcIiAodG91Y2htb3ZlKT1cIm9uR3V0dGVyVG91Y2hNb3ZlKCRldmVudCwgaSlcIiAodG91Y2hlbmQpPVwib25HdXR0ZXJUb3VjaEVuZCgkZXZlbnQsIGkpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNwbGl0dGVyLWd1dHRlci1oYW5kbGVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBzdHlsZVVybHM6IFsnLi9zcGxpdHRlci5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MucC1zcGxpdHRlci1wYW5lbC1uZXN0ZWRdJzogJ25lc3RlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0dGVyIHtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0YXRlU3RvcmFnZTogc3RyaW5nID0gXCJzZXNzaW9uXCI7XG5cbiAgICBASW5wdXQoKSBzdGF0ZUtleTogc3RyaW5nID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIGxheW91dDogc3RyaW5nID0gXCJob3Jpem9udGFsXCI7XG5cbiAgICBASW5wdXQoKSBndXR0ZXJTaXplOiBudW1iZXIgPSA0O1xuXG4gICAgQElucHV0KCkgcGFuZWxTaXplczogbnVtYmVyW10gPSBbXTtcblxuICAgIEBJbnB1dCgpIG1pblNpemVzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgQE91dHB1dCgpIG9uUmVzaXplRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oVGVtcGxhdGVSZWYpIHBhbmVsczogUXVlcnlMaXN0PGFueT47XG4gICAgXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIG5lc3RlZCA9IGZhbHNlO1xuXG4gICAgZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIG1vdXNlTW92ZUxpc3RlbmVyID0gbnVsbDtcblxuICAgIG1vdXNlVXBMaXN0ZW5lciA9IG51bGw7XG5cbiAgICBzaXplID0gbnVsbDtcblxuICAgIGd1dHRlckVsZW1lbnQgPSBudWxsO1xuXG4gICAgc3RhcnRQb3MgPSBudWxsO1xuXG4gICAgcHJldlBhbmVsRWxlbWVudCA9IG51bGw7XG5cbiAgICBuZXh0UGFuZWxFbGVtZW50ID0gbnVsbDtcblxuICAgIG5leHRQYW5lbFNpemUgPSBudWxsO1xuXG4gICAgcHJldlBhbmVsU2l6ZSA9IG51bGw7XG5cbiAgICBfcGFuZWxTaXplcyA9IG51bGw7XG5cbiAgICBwcmV2UGFuZWxJbmRleCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm5lc3RlZCA9IHRoaXMuaXNOZXN0ZWQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVscyAmJiB0aGlzLnBhbmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQgPSB0aGlzLnJlc3RvcmVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gWy4uLnRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlbl0uZmlsdGVyKGNoaWxkID0+IERvbUhhbmRsZXIuaGFzQ2xhc3MoY2hpbGQsICdwLXNwbGl0dGVyLXBhbmVsJykpO1xuICAgICAgICAgICAgICAgIGxldCBfcGFuZWxTaXplcyA9IFtdO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxzLm1hcCgocGFuZWwsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhbmVsSW5pdGlhbFNpemUgPSB0aGlzLnBhbmVsU2l6ZXMubGVuZ3RoIC0xID49IGkgPyB0aGlzLnBhbmVsU2l6ZXNbaV06IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYW5lbFNpemUgPSBwYW5lbEluaXRpYWxTaXplIHx8ICgxMDAgLyB0aGlzLnBhbmVscy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBfcGFuZWxTaXplc1tpXSA9IHBhbmVsU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5baV0uc3R5bGUuZmxleEJhc2lzID0gJ2NhbGMoJyArIHBhbmVsU2l6ZSArICclIC0gJyArICgodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9wYW5lbFNpemVzID0gX3BhbmVsU2l6ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJlc2l6ZVN0YXJ0KGV2ZW50LCBpbmRleCkge1xuICAgICAgICB0aGlzLmd1dHRlckVsZW1lbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLnNpemUgPSB0aGlzLmhvcml6b250YWwoKSA/IERvbUhhbmRsZXIuZ2V0V2lkdGgodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkgOiBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhcnRQb3MgPSB0aGlzLmhvcml6b250YWwoKSA/IGV2ZW50LnBhZ2VYIDogZXZlbnQucGFnZVk7XG4gICAgICAgIHRoaXMucHJldlBhbmVsRWxlbWVudCA9IHRoaXMuZ3V0dGVyRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB0aGlzLm5leHRQYW5lbEVsZW1lbnQgPSB0aGlzLmd1dHRlckVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB0aGlzLnByZXZQYW5lbFNpemUgPSAxMDAgKiAodGhpcy5ob3Jpem9udGFsKCkgPyBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5wcmV2UGFuZWxFbGVtZW50LCB0cnVlKTogRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnByZXZQYW5lbEVsZW1lbnQsIHRydWUpKSAvIHRoaXMuc2l6ZTtcbiAgICAgICAgdGhpcy5uZXh0UGFuZWxTaXplID0gMTAwICogKHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMubmV4dFBhbmVsRWxlbWVudCwgdHJ1ZSk6IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5uZXh0UGFuZWxFbGVtZW50LCB0cnVlKSkgLyB0aGlzLnNpemU7XG4gICAgICAgIHRoaXMucHJldlBhbmVsSW5kZXggPSBpbmRleDtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmd1dHRlckVsZW1lbnQsICdwLXNwbGl0dGVyLWd1dHRlci1yZXNpemluZycpO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdwLXNwbGl0dGVyLXJlc2l6aW5nJyk7XG4gICAgfVxuXG4gICAgb25SZXNpemUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG5ld1BvcztcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbCgpKVxuICAgICAgICAgICAgbmV3UG9zID0gKGV2ZW50LnBhZ2VYICogMTAwIC8gdGhpcy5zaXplKSAtICh0aGlzLnN0YXJ0UG9zICogMTAwIC8gdGhpcy5zaXplKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmV3UG9zID0gKGV2ZW50LnBhZ2VZICogMTAwIC8gdGhpcy5zaXplKSAtICh0aGlzLnN0YXJ0UG9zICogMTAwIC8gdGhpcy5zaXplKTtcblxuICAgICAgICBsZXQgbmV3UHJldlBhbmVsU2l6ZSA9IHRoaXMucHJldlBhbmVsU2l6ZSArIG5ld1BvcztcbiAgICAgICAgbGV0IG5ld05leHRQYW5lbFNpemUgPSB0aGlzLm5leHRQYW5lbFNpemUgLSBuZXdQb3M7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVJlc2l6ZShuZXdQcmV2UGFuZWxTaXplLCBuZXdOZXh0UGFuZWxTaXplKSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2UGFuZWxFbGVtZW50LnN0eWxlLmZsZXhCYXNpcyA9ICdjYWxjKCcgKyBuZXdQcmV2UGFuZWxTaXplICsgJyUgLSAnICsgKCh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSkgKyAncHgpJztcbiAgICAgICAgICAgIHRoaXMubmV4dFBhbmVsRWxlbWVudC5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgbmV3TmV4dFBhbmVsU2l6ZSArICclIC0gJyArICgodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUpICsgJ3B4KSc7XG4gICAgICAgICAgICB0aGlzLl9wYW5lbFNpemVzW3RoaXMucHJldlBhbmVsSW5kZXhdID0gbmV3UHJldlBhbmVsU2l6ZTtcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXNbdGhpcy5wcmV2UGFuZWxJbmRleCArIDFdID0gbmV3TmV4dFBhbmVsU2l6ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZUVuZChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMub25SZXNpemVFbmQuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIHNpemVzOiB0aGlzLl9wYW5lbFNpemVzfSlcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmd1dHRlckVsZW1lbnQsICdwLXNwbGl0dGVyLWd1dHRlci1yZXNpemluZycpO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdwLXNwbGl0dGVyLXJlc2l6aW5nJyk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBvbkd1dHRlck1vdXNlRG93bihldmVudCwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5vblJlc2l6ZVN0YXJ0KGV2ZW50LCBpbmRleCk7XG4gICAgICAgIHRoaXMuYmluZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgb25HdXR0ZXJUb3VjaFN0YXJ0KGV2ZW50LCBpbmRleCkge1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RhcnQoZXZlbnQsIGluZGV4KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkd1dHRlclRvdWNoTW92ZShldmVudCkge1xuICAgICAgICB0aGlzLm9uUmVzaXplKGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkd1dHRlclRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucmVzaXplRW5kKGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVJlc2l6ZShuZXdQcmV2UGFuZWxTaXplLCBuZXdOZXh0UGFuZWxTaXplKSB7XG4gICAgICAgIGlmICh0aGlzLm1pblNpemVzLmxlbmd0aCA+PSAxICYmIHRoaXMubWluU2l6ZXNbMF0gJiYgdGhpcy5taW5TaXplc1swXSA+IG5ld1ByZXZQYW5lbFNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1pblNpemVzLmxlbmd0aCA+IDEgJiYgdGhpcy5taW5TaXplc1sxXSAmJiB0aGlzLm1pblNpemVzWzFdID4gbmV3TmV4dFBhbmVsU2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYmluZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMubW91c2VNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIgPSBldmVudCA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubW91c2VVcExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlVXBMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUVuZChldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tb3VzZU1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vdXNlVXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2l6ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhcnRQb3MgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZQYW5lbEVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRQYW5lbEVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZQYW5lbFNpemUgPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRQYW5lbFNpemUgPSBudWxsO1xuICAgICAgICB0aGlzLmd1dHRlckVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZQYW5lbEluZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpc05lc3RlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAhRG9tSGFuZGxlci5oYXNDbGFzcyhwYXJlbnQsICdwLXNwbGl0dGVyJykpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudCAhPT0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpc1N0YXRlZnVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZUtleSAhPSBudWxsO1xuICAgIH1cblxuICAgIGdldFN0b3JhZ2UoKSB7XG4gICAgICAgIHN3aXRjaCh0aGlzLnN0YXRlU3RvcmFnZSkge1xuICAgICAgICAgICAgY2FzZSAnbG9jYWwnOlxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gICAgICAgICAgICBjYXNlICdzZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNlc3Npb25TdG9yYWdlO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLnN0YXRlU3RvcmFnZSArICcgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHRoZSBzdGF0ZSBzdG9yYWdlLCBzdXBwb3J0ZWQgdmFsdWVzIGFyZSBcImxvY2FsXCIgYW5kIFwic2Vzc2lvblwiLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZVN0YXRlKCkge1xuICAgICAgICB0aGlzLmdldFN0b3JhZ2UoKS5zZXRJdGVtKHRoaXMuc3RhdGVLZXksIEpTT04uc3RyaW5naWZ5KHRoaXMuX3BhbmVsU2l6ZXMpKTtcbiAgICB9XG5cbiAgICByZXN0b3JlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcbiAgICAgICAgY29uc3Qgc3RhdGVTdHJpbmcgPSBzdG9yYWdlLmdldEl0ZW0odGhpcy5zdGF0ZUtleSk7XG5cbiAgICAgICAgaWYgKHN0YXRlU3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9wYW5lbFNpemVzID0gSlNPTi5wYXJzZShzdGF0ZVN0cmluZyk7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBbLi4udGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5jaGlsZHJlbl0uZmlsdGVyKGNoaWxkID0+IERvbUhhbmRsZXIuaGFzQ2xhc3MoY2hpbGQsICdwLXNwbGl0dGVyLXBhbmVsJykpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZC5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgdGhpcy5fcGFuZWxTaXplc1tpXSArICclIC0gJyArICgodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUpICsgJ3B4KSc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1zcGxpdHRlciBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1zcGxpdHRlci1ob3Jpem9udGFsJzogdGhpcy5sYXlvdXQgPT09IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgICAgICAgJ3Atc3BsaXR0ZXItdmVydGljYWwnOiB0aGlzLmxheW91dCA9PT0gXCJ2ZXJ0aWNhbFwiXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcGFuZWxDb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLXNwbGl0dGVyLXBhbmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLXNwbGl0dGVyLXBhbmVsLW5lc3RlZCc6IHRydWVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBndXR0ZXJTdHlsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbCgpKVxuICAgICAgICAgICAgcmV0dXJuIHt3aWR0aDogdGhpcy5ndXR0ZXJTaXplICsgJ3B4J307XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB7aGVpZ2h0OiB0aGlzLmd1dHRlclNpemUgKyAncHgnfTtcbiAgICB9XG5cbiAgICBob3Jpem9udGFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJztcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1NwbGl0dGVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTcGxpdHRlcl1cbn0pXG5leHBvcnQgY2xhc3MgU3BsaXR0ZXJNb2R1bGUgeyB9XG4iXX0=