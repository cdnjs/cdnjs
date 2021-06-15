import { NgModule, Component, Input, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ScrollPanel {
    constructor(el, zone, cd) {
        this.el = el;
        this.zone = zone;
        this.cd = cd;
        this.timeoutFrame = (fn) => setTimeout(fn, 0);
    }
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            this.moveBar();
            this.moveBar = this.moveBar.bind(this);
            this.onXBarMouseDown = this.onXBarMouseDown.bind(this);
            this.onYBarMouseDown = this.onYBarMouseDown.bind(this);
            this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
            this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
            window.addEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.addEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.addEventListener('mousedown', this.onYBarMouseDown);
            this.calculateContainerHeight();
            this.initialized = true;
        });
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    calculateContainerHeight() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        let xBar = this.xBarViewChild.nativeElement;
        let containerStyles = getComputedStyle(container), xBarStyles = getComputedStyle(xBar), pureContainerHeight = DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);
        if (containerStyles['max-height'] != "none" && pureContainerHeight == 0) {
            if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            }
            else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
            }
        }
    }
    moveBar() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        /* horizontal scroll */
        let xBar = this.xBarViewChild.nativeElement;
        let totalWidth = content.scrollWidth;
        let ownWidth = content.clientWidth;
        let bottom = (container.clientHeight - xBar.clientHeight) * -1;
        this.scrollXRatio = ownWidth / totalWidth;
        /* vertical scroll */
        let yBar = this.yBarViewChild.nativeElement;
        let totalHeight = content.scrollHeight;
        let ownHeight = content.clientHeight;
        let right = (container.clientWidth - yBar.clientWidth) * -1;
        this.scrollYRatio = ownHeight / totalHeight;
        this.requestAnimationFrame(() => {
            if (this.scrollXRatio >= 1) {
                DomHandler.addClass(xBar, 'p-scrollpanel-hidden');
            }
            else {
                DomHandler.removeClass(xBar, 'p-scrollpanel-hidden');
                const xBarWidth = Math.max(this.scrollXRatio * 100, 10);
                const xBarLeft = content.scrollLeft * (100 - xBarWidth) / (totalWidth - ownWidth);
                xBar.style.cssText = 'width:' + xBarWidth + '%; left:' + xBarLeft + '%;bottom:' + bottom + 'px;';
            }
            if (this.scrollYRatio >= 1) {
                DomHandler.addClass(yBar, 'p-scrollpanel-hidden');
            }
            else {
                DomHandler.removeClass(yBar, 'p-scrollpanel-hidden');
                const yBarHeight = Math.max(this.scrollYRatio * 100, 10);
                const yBarTop = content.scrollTop * (100 - yBarHeight) / (totalHeight - ownHeight);
                yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
        this.cd.markForCheck();
    }
    onYBarMouseDown(e) {
        this.isYBarClicked = true;
        this.lastPageY = e.pageY;
        DomHandler.addClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }
    onXBarMouseDown(e) {
        this.isXBarClicked = true;
        this.lastPageX = e.pageX;
        DomHandler.addClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }
    onDocumentMouseMove(e) {
        if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        }
        else if (this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
        }
        else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
        }
    }
    onMouseMoveForXBar(e) {
        let deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollLeft += deltaX / this.scrollXRatio;
        });
    }
    onMouseMoveForYBar(e) {
        let deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollTop += deltaY / this.scrollYRatio;
        });
    }
    scrollTop(scrollTop) {
        let scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        this.contentViewChild.nativeElement.scrollTop = scrollTop;
    }
    onDocumentMouseUp(e) {
        DomHandler.removeClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        DomHandler.removeClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        DomHandler.removeClass(document.body, 'p-scrollpanel-grabbed');
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    }
    requestAnimationFrame(f) {
        let frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    }
    ngOnDestroy() {
        if (this.initialized) {
            window.removeEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.removeEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.removeEventListener('mousedown', this.onYBarMouseDown);
        }
    }
    refresh() {
        this.moveBar();
    }
}
ScrollPanel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ScrollPanel, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ScrollPanel.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: ScrollPanel, selector: "p-scrollPanel", inputs: { style: "style", styleClass: "styleClass" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }, { propertyName: "xBarViewChild", first: true, predicate: ["xBar"], descendants: true }, { propertyName: "yBarViewChild", first: true, predicate: ["yBar"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-scrollpanel-wrapper">
                <div #content class="p-scrollpanel-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div #xBar class="p-scrollpanel-bar p-scrollpanel-bar-x"></div>
            <div #yBar class="p-scrollpanel-bar p-scrollpanel-bar-y"></div>   
        </div>
    `, isInline: true, styles: [".p-scrollpanel-wrapper{overflow:hidden;width:100%;height:100%;position:relative;z-index:1;float:left}.p-scrollpanel-content{height:calc(100% + 18px);width:calc(100% + 18px);padding:0 18px 18px 0;position:relative;overflow:auto;box-sizing:border-box}.p-scrollpanel-bar{position:relative;background:#c1c1c1;border-radius:3px;z-index:2;cursor:pointer;opacity:0;transition:opacity .25s linear}.p-scrollpanel-bar-y{width:9px;top:0}.p-scrollpanel-bar-x{height:9px;bottom:0}.p-scrollpanel-hidden{visibility:hidden}.p-scrollpanel:active .p-scrollpanel-bar,.p-scrollpanel:hover .p-scrollpanel-bar{opacity:1}.p-scrollpanel-grabbed{-webkit-user-select:none;-ms-user-select:none;user-select:none}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ScrollPanel, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-scrollPanel',
                    template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-scrollpanel-wrapper">
                <div #content class="p-scrollpanel-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div #xBar class="p-scrollpanel-bar p-scrollpanel-bar-x"></div>
            <div #yBar class="p-scrollpanel-bar p-scrollpanel-bar-y"></div>   
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./scrollpanel.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], xBarViewChild: [{
                type: ViewChild,
                args: ['xBar']
            }], yBarViewChild: [{
                type: ViewChild,
                args: ['yBar']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ScrollPanelModule {
}
ScrollPanelModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ScrollPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ScrollPanelModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ScrollPanelModule, declarations: [ScrollPanel], imports: [CommonModule], exports: [ScrollPanel] });
ScrollPanelModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ScrollPanelModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ScrollPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ScrollPanel],
                    declarations: [ScrollPanel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xscGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2Nyb2xscGFuZWwvc2Nyb2xscGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFnRCxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQXVDLGVBQWUsRUFBMEIsTUFBTSxlQUFlLENBQUM7QUFDOU8sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBb0I1QyxNQUFNLE9BQU8sV0FBVztJQU1wQixZQUFtQixFQUFjLEVBQVMsSUFBWSxFQUFTLEVBQXFCO1FBQWpFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFnQnBGLGlCQUFZLEdBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFoQnlDLENBQUM7SUE4QnhGLGVBQWU7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENB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QVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQ3RCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmLCBOZ1pvbmUsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3RvclJlZiwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zY3JvbGxQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cIidwLXNjcm9sbHBhbmVsIHAtY29tcG9uZW50J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNjcm9sbHBhbmVsLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwicC1zY3JvbGxwYW5lbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICN4QmFyIGNsYXNzPVwicC1zY3JvbGxwYW5lbC1iYXIgcC1zY3JvbGxwYW5lbC1iYXIteFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjeUJhciBjbGFzcz1cInAtc2Nyb2xscGFuZWwtYmFyIHAtc2Nyb2xscGFuZWwtYmFyLXlcIj48L2Rpdj4gICBcbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2Nyb2xscGFuZWwuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsUGFuZWwgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3hCYXInKSB4QmFyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIEBWaWV3Q2hpbGQoJ3lCYXInKSB5QmFyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgc2Nyb2xsWVJhdGlvOiBudW1iZXI7XG5cbiAgICBzY3JvbGxYUmF0aW86IG51bWJlcjtcblxuICAgIHRpbWVvdXRGcmFtZTogYW55ID0gKGZuKSA9PiBzZXRUaW1lb3V0KGZuLCAwKTtcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuXG4gICAgbGFzdFBhZ2VZOiBudW1iZXI7XG5cbiAgICBsYXN0UGFnZVg6IG51bWJlcjtcblxuICAgIGlzWEJhckNsaWNrZWQ6IGJvb2xlYW47XG5cbiAgICBpc1lCYXJDbGlja2VkOiBib29sZWFuO1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb3ZlQmFyKCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVCYXIgPSB0aGlzLm1vdmVCYXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25YQmFyTW91c2VEb3duID0gdGhpcy5vblhCYXJNb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25ZQmFyTW91c2VEb3duID0gdGhpcy5vbllCYXJNb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZSA9IHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VVcCA9IHRoaXMub25Eb2N1bWVudE1vdXNlVXAuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1vdmVCYXIpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICB0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uWEJhck1vdXNlRG93bik7XG4gICAgICAgICAgICB0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uWUJhck1vdXNlRG93bik7XG5cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCB4QmFyID0gdGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgbGV0IGNvbnRhaW5lclN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKSxcbiAgICAgICAgeEJhclN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoeEJhciksXG4gICAgICAgIHB1cmVDb250YWluZXJIZWlnaHQgPSBEb21IYW5kbGVyLmdldEhlaWdodChjb250YWluZXIpIC0gcGFyc2VJbnQoeEJhclN0eWxlc1snaGVpZ2h0J10sIDEwKTtcblxuICAgICAgICBpZiAoY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J10gIT0gXCJub25lXCIgJiYgcHVyZUNvbnRhaW5lckhlaWdodCA9PSAwKSB7XG4gICAgICAgICAgICBpZiAoY29udGVudC5vZmZzZXRIZWlnaHQgKyBwYXJzZUludCh4QmFyU3R5bGVzWydoZWlnaHQnXSwgMTApID4gcGFyc2VJbnQoY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J10sIDEwKSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBjb250YWluZXJTdHlsZXNbJ21heC1oZWlnaHQnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBjb250ZW50Lm9mZnNldEhlaWdodCArIHBhcnNlRmxvYXQoY29udGFpbmVyU3R5bGVzLnBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMucGFkZGluZ0JvdHRvbSkgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5ib3JkZXJCb3R0b21XaWR0aCkgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQmFyKCkge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAvKiBob3Jpem9udGFsIHNjcm9sbCAqL1xuICAgICAgICBsZXQgeEJhciA9IHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgdG90YWxXaWR0aCA9IGNvbnRlbnQuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGxldCBvd25XaWR0aCA9IGNvbnRlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGxldCBib3R0b20gPSAoY29udGFpbmVyLmNsaWVudEhlaWdodCAtIHhCYXIuY2xpZW50SGVpZ2h0KSAqIC0xO1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsWFJhdGlvID0gb3duV2lkdGggLyB0b3RhbFdpZHRoO1xuXG4gICAgICAgIC8qIHZlcnRpY2FsIHNjcm9sbCAqL1xuICAgICAgICBsZXQgeUJhciA9IHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgdG90YWxIZWlnaHQgPSBjb250ZW50LnNjcm9sbEhlaWdodDtcbiAgICAgICAgbGV0IG93bkhlaWdodCA9IGNvbnRlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBsZXQgcmlnaHQgPSAoY29udGFpbmVyLmNsaWVudFdpZHRoIC0geUJhci5jbGllbnRXaWR0aCkgKiAtMTtcblxuICAgICAgICB0aGlzLnNjcm9sbFlSYXRpbyA9IG93bkhlaWdodCAvIHRvdGFsSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbFhSYXRpbyA+PSAxKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh4QmFyLCAncC1zY3JvbGxwYW5lbC1oaWRkZW4nKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHhCYXIsICdwLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHhCYXJXaWR0aCA9IE1hdGgubWF4KHRoaXMuc2Nyb2xsWFJhdGlvICogMTAwLCAxMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeEJhckxlZnQgPSBjb250ZW50LnNjcm9sbExlZnQgKiAoMTAwIC0geEJhcldpZHRoKSAvICh0b3RhbFdpZHRoIC0gb3duV2lkdGgpO1xuICAgICAgICAgICAgICAgIHhCYXIuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDonICsgeEJhcldpZHRoICsgJyU7IGxlZnQ6JyArIHhCYXJMZWZ0ICsgJyU7Ym90dG9tOicgKyBib3R0b20gKyAncHg7JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsWVJhdGlvID49IDEpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHlCYXIsICdwLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoeUJhciwgJ3Atc2Nyb2xscGFuZWwtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgeUJhckhlaWdodCA9IE1hdGgubWF4KHRoaXMuc2Nyb2xsWVJhdGlvICogMTAwLCAxMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeUJhclRvcCA9IGNvbnRlbnQuc2Nyb2xsVG9wICogKDEwMCAtIHlCYXJIZWlnaHQpIC8gKHRvdGFsSGVpZ2h0IC0gb3duSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB5QmFyLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OicgKyB5QmFySGVpZ2h0ICsgJyU7IHRvcDogY2FsYygnICsgeUJhclRvcCArICclIC0gJyArIHhCYXIuY2xpZW50SGVpZ2h0ICsgJ3B4KTtyaWdodDonICsgcmlnaHQgKyAncHg7JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25ZQmFyTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1lCYXJDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBlLnBhZ2VZO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG4gICAgICAgIFxuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbkRvY3VtZW50TW91c2VVcCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblhCYXJNb3VzZURvd24oZTogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLmlzWEJhckNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGUucGFnZVg7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcblxuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbkRvY3VtZW50TW91c2VVcCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkRvY3VtZW50TW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNYQmFyQ2xpY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvclhCYXIoZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc1lCYXJDbGlja2VkKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlRm9yWUJhcihlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmVGb3JYQmFyKGUpO1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvcllCYXIoZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmVGb3JYQmFyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IGRlbHRhWCA9IGUucGFnZVggLSB0aGlzLmxhc3RQYWdlWDtcbiAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBlLnBhZ2VYO1xuXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgKz0gZGVsdGFYIC8gdGhpcy5zY3JvbGxYUmF0aW87XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTW91c2VNb3ZlRm9yWUJhcihlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGxldCBkZWx0YVkgPSBlLnBhZ2VZIC0gdGhpcy5sYXN0UGFnZVk7XG4gICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZS5wYWdlWTtcblxuICAgICAgICB0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgKz0gZGVsdGFZIC8gdGhpcy5zY3JvbGxZUmF0aW87XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNjcm9sbFRvcChzY3JvbGxUb3A6IG51bWJlcikge1xuICAgICAgICBsZXQgc2Nyb2xsYWJsZUhlaWdodCA9IHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgc2Nyb2xsVG9wID0gc2Nyb2xsVG9wID4gc2Nyb2xsYWJsZUhlaWdodCA/IHNjcm9sbGFibGVIZWlnaHQgOiBzY3JvbGxUb3AgPiAwID8gc2Nyb2xsVG9wIDogMDtcbiAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIG9uRG9jdW1lbnRNb3VzZVVwKGU6IEV2ZW50KSB7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3Atc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcblxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbkRvY3VtZW50TW91c2VVcCk7XG4gICAgICAgIHRoaXMuaXNYQmFyQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzWUJhckNsaWNrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZjogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fMKgdGhpcy50aW1lb3V0RnJhbWU7XG4gICAgICAgIGZyYW1lKGYpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1vdmVCYXIpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICB0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uWEJhck1vdXNlRG93bik7XG4gICAgICAgICAgICB0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uWUJhck1vdXNlRG93bik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLm1vdmVCYXIoKTtcbiAgICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU2Nyb2xsUGFuZWxdLFxuICAgIGRlY2xhcmF0aW9uczogW1Njcm9sbFBhbmVsXVxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxQYW5lbE1vZHVsZSB7IH1cbiJdfQ==