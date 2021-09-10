import { NgModule, Component, Input, Output, EventEmitter, ContentChildren, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
export class OverlayPanel {
    constructor(el, renderer, cd, zone, config, overlayService) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.config = config;
        this.overlayService = overlayService;
        this.dismissable = true;
        this.appendTo = 'body';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.focusOnShow = true;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.overlayVisible = false;
        this.render = false;
        this.selfClick = false;
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
            this.cd.markForCheck();
        });
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener && this.dismissable) {
            this.zone.runOutsideAngular(() => {
                let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
                const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                    if (!this.container.contains(event.target) && this.target !== event.target && !this.target.contains(event.target) && !this.selfClick) {
                        this.zone.run(() => {
                            this.hide();
                        });
                    }
                    this.selfClick = false;
                    this.cd.markForCheck();
                });
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
            this.selfClick = false;
        }
    }
    toggle(event, target) {
        if (this.overlayVisible) {
            if (this.hasTargetChanged(event, target)) {
                this.destroyCallback = () => {
                    this.show(null, (target || event.currentTarget || event.target));
                };
            }
            this.hide();
        }
        else {
            this.show(event, target);
        }
    }
    show(event, target) {
        this.target = target || event.currentTarget || event.target;
        this.overlayVisible = true;
        this.render = true;
        this.cd.markForCheck();
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
        this.selfClick = true;
    }
    hasTargetChanged(event, target) {
        return this.target != null && this.target !== (target || event.currentTarget || event.target);
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
    align() {
        if (this.autoZIndex) {
            ZIndexUtils.set('overlay', this.container, this.baseZIndex + this.config.zIndex.overlay);
        }
        DomHandler.absolutePosition(this.container, this.target);
        const containerOffset = DomHandler.getOffset(this.container);
        const targetOffset = DomHandler.getOffset(this.target);
        let arrowLeft = 0;
        if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left;
        }
        this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);
        if (containerOffset.top < targetOffset.top) {
            DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
        }
    }
    onAnimationStart(event) {
        if (event.toState === 'open') {
            this.container = event.element;
            this.onShow.emit(null);
            this.appendContainer();
            this.align();
            this.bindDocumentClickListener();
            this.bindDocumentResizeListener();
            this.bindScrollListener();
            if (this.focusOnShow) {
                this.focus();
            }
            this.overlayEventListener = (e) => {
                if (this.container && this.container.contains(e.target)) {
                    this.selfClick = true;
                }
            };
            this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                if (this.destroyCallback) {
                    this.destroyCallback();
                    this.destroyCallback = null;
                }
                if (this.overlaySubscription) {
                    this.overlaySubscription.unsubscribe();
                }
                break;
            case 'close':
                if (this.autoZIndex) {
                    ZIndexUtils.clear(this.container);
                }
                if (this.overlaySubscription) {
                    this.overlaySubscription.unsubscribe();
                }
                this.onContainerDestroy();
                this.onHide.emit({});
                this.render = false;
                break;
        }
    }
    focus() {
        let focusable = DomHandler.findSingle(this.container, '[autofocus]');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }
    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }
    onCloseClick(event) {
        this.hide();
        event.preventDefault();
    }
    onWindowResize(event) {
        this.hide();
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    onContainerDestroy() {
        this.target = null;
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
    }
    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }
        this.target = null;
        this.destroyCallback = null;
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
    }
}
OverlayPanel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: OverlayPanel, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
OverlayPanel.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: OverlayPanel, selector: "p-overlayPanel", inputs: { dismissable: "dismissable", showCloseIcon: "showCloseIcon", style: "style", styleClass: "styleClass", appendTo: "appendTo", autoZIndex: "autoZIndex", ariaCloseLabel: "ariaCloseLabel", baseZIndex: "baseZIndex", focusOnShow: "focusOnShow", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div *ngIf="render" [ngClass]="'p-overlaypanel p-component'" [ngStyle]="style" [class]="styleClass" (click)="onOverlayClick($event)"
            [@animation]="{value: (overlayVisible ? 'open': 'close'), params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)">
            <div class="p-overlaypanel-content">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
            <button *ngIf="showCloseIcon" type="button" class="p-overlaypanel-close p-link" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel" pRipple>
                <span class="p-overlaypanel-close-icon pi pi-times"></span>
            </button>
        </div>
    `, isInline: true, styles: [".p-overlaypanel{position:absolute;margin-top:10px;top:0;left:0}.p-overlaypanel-flipped{margin-top:0;margin-bottom:10px}.p-overlaypanel-close{display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-overlaypanel:after,.p-overlaypanel:before{bottom:100%;left:calc(0 + 1.25rem);left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:\" \";height:0;width:0;position:absolute;pointer-events:none}.p-overlaypanel:after{border-width:8px;margin-left:-8px}.p-overlaypanel:before{border-width:10px;margin-left:-10px}.p-overlaypanel-shifted:after,.p-overlaypanel-shifted:before{left:auto;right:1.25em;margin-left:auto}.p-overlaypanel-flipped:after,.p-overlaypanel-flipped:before{bottom:auto;top:100%}.p-overlaypanel.p-overlaypanel-flipped:after,.p-overlaypanel.p-overlaypanel-flipped:before{border-bottom-color:transparent}"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.Ripple, selector: "[pRipple]" }], animations: [
        trigger('animation', [
            state('void', style({
                transform: 'scaleY(0.8)',
                opacity: 0
            })),
            state('close', style({
                opacity: 0
            })),
            state('open', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => open', animate('{{showTransitionParams}}')),
            transition('open => close', animate('{{hideTransitionParams}}')),
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: OverlayPanel, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-overlayPanel',
                    template: `
        <div *ngIf="render" [ngClass]="'p-overlaypanel p-component'" [ngStyle]="style" [class]="styleClass" (click)="onOverlayClick($event)"
            [@animation]="{value: (overlayVisible ? 'open': 'close'), params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)">
            <div class="p-overlaypanel-content">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
            <button *ngIf="showCloseIcon" type="button" class="p-overlaypanel-close p-link" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel" pRipple>
                <span class="p-overlaypanel-close-icon pi pi-times"></span>
            </button>
        </div>
    `,
                    animations: [
                        trigger('animation', [
                            state('void', style({
                                transform: 'scaleY(0.8)',
                                opacity: 0
                            })),
                            state('close', style({
                                opacity: 0
                            })),
                            state('open', style({
                                transform: 'translateY(0)',
                                opacity: 1
                            })),
                            transition('void => open', animate('{{showTransitionParams}}')),
                            transition('open => close', animate('{{hideTransitionParams}}')),
                        ])
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./overlaypanel.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }]; }, propDecorators: { dismissable: [{
                type: Input
            }], showCloseIcon: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], ariaCloseLabel: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], focusOnShow: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class OverlayPanelModule {
}
OverlayPanelModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: OverlayPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OverlayPanelModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: OverlayPanelModule, declarations: [OverlayPanel], imports: [CommonModule, RippleModule, SharedModule], exports: [OverlayPanel, SharedModule] });
OverlayPanelModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: OverlayPanelModule, imports: [[CommonModule, RippleModule, SharedModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: OverlayPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, SharedModule],
                    exports: [OverlayPanel, SharedModule],
                    declarations: [OverlayPanel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheXBhbmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL292ZXJsYXlwYW5lbC9vdmVybGF5cGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBVyxZQUFZLEVBQ3RELGVBQWUsRUFBd0MsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUUsNkJBQTZCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQWdDLE1BQU0sYUFBYSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBZ0IsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztBQTBDMUMsTUFBTSxPQUFPLFlBQVk7SUF3RHJCLFlBQW1CLEVBQWMsRUFBUyxRQUFtQixFQUFTLEVBQXFCLEVBQVUsSUFBWSxFQUFTLE1BQXFCLEVBQVMsY0FBOEI7UUFBbkssT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBdEQ3SyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQVE1QixhQUFRLEdBQVEsTUFBTSxDQUFDO1FBRXZCLGVBQVUsR0FB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LEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxjQUFjO3NCQUF0QixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFFRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBRUcscUJBQXFCO3NCQUE3QixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTTtnQkFFRyxNQUFNO3NCQUFmLE1BQU07Z0JBRXlCLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTs7QUE4UmxDLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkExVGxCLFlBQVksYUFzVFgsWUFBWSxFQUFDLFlBQVksRUFBRSxZQUFZLGFBdFR4QyxZQUFZLEVBdVRHLFlBQVk7Z0hBRzNCLGtCQUFrQixZQUpsQixDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLEVBQzFCLFlBQVk7MkZBRzNCLGtCQUFrQjtrQkFMOUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztvQkFDbEQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztvQkFDckMsWUFBWSxFQUFFLENBQUMsWUFBWSxDQUFDO2lCQUMvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxPbkRlc3Ryb3ksRXZlbnRFbWl0dGVyLFJlbmRlcmVyMixFbGVtZW50UmVmLENoYW5nZURldGVjdG9yUmVmLE5nWm9uZSxcbiAgICAgICAgQ29udGVudENoaWxkcmVuLFRlbXBsYXRlUmVmLEFmdGVyQ29udGVudEluaXQsUXVlcnlMaXN0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlciwgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGUsIFByaW1lTkdDb25maWcsIE92ZXJsYXlTZXJ2aWNlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1JpcHBsZU1vZHVsZX0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1pJbmRleFV0aWxzfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atb3ZlcmxheVBhbmVsJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICpuZ0lmPVwicmVuZGVyXCIgW25nQ2xhc3NdPVwiJ3Atb3ZlcmxheXBhbmVsIHAtY29tcG9uZW50J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAoY2xpY2spPVwib25PdmVybGF5Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICBbQGFuaW1hdGlvbl09XCJ7dmFsdWU6IChvdmVybGF5VmlzaWJsZSA/ICdvcGVuJzogJ2Nsb3NlJyksIHBhcmFtczoge3Nob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fVwiXG4gICAgICAgICAgICAgICAgKEBhbmltYXRpb24uc3RhcnQpPVwib25BbmltYXRpb25TdGFydCgkZXZlbnQpXCIgKEBhbmltYXRpb24uZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1vdmVybGF5cGFuZWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93Q2xvc2VJY29uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicC1vdmVybGF5cGFuZWwtY2xvc2UgcC1saW5rXCIgKGNsaWNrKT1cIm9uQ2xvc2VDbGljaygkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiaGlkZSgpXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhQ2xvc2VMYWJlbFwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW92ZXJsYXlwYW5lbC1jbG9zZS1pY29uIHBpIHBpLXRpbWVzXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdhbmltYXRpb24nLCBbXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZVkoMC44KScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ2Nsb3NlJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCdvcGVuJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gb3BlbicsIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ29wZW4gPT4gY2xvc2UnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL292ZXJsYXlwYW5lbC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5UGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgZGlzbWlzc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2hvd0Nsb3NlSWNvbjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55ID0gJ2JvZHknO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBhcmlhQ2xvc2VMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIGZvY3VzT25TaG93OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xMnMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjFzIGxpbmVhcic7XG5cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcblxuICAgIG92ZXJsYXlWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICByZW5kZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHNlbGZDbGljazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICB0YXJnZXQ6IGFueTtcblxuICAgIHdpbGxIaWRlOiBib29sZWFuO1xuXG4gICAgc2Nyb2xsSGFuZGxlcjogYW55O1xuXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZGVzdHJveUNhbGxiYWNrOiBGdW5jdGlvbjtcblxuICAgIG92ZXJsYXlFdmVudExpc3RlbmVyO1xuXG4gICAgb3ZlcmxheVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2UpIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgJiYgdGhpcy5kaXNtaXNzYWJsZSkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZG9jdW1lbnRFdmVudCA9IERvbUhhbmRsZXIuaXNJT1MoKSA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljayc7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6ICdkb2N1bWVudCc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCBkb2N1bWVudEV2ZW50LCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lci5jb250YWlucyhldmVudC50YXJnZXQpICYmIHRoaXMudGFyZ2V0ICE9PSBldmVudC50YXJnZXQgJiYgIXRoaXMudGFyZ2V0LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiYgIXRoaXMuc2VsZkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNlbGZDbGljayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50LCB0YXJnZXQ/KSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUYXJnZXRDaGFuZ2VkKGV2ZW50LCB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95Q2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhudWxsLCAodGFyZ2V0fHxldmVudC5jdXJyZW50VGFyZ2V0fHxldmVudC50YXJnZXQpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdyhldmVudCwgdGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coZXZlbnQsIHRhcmdldD8pIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXR8fGV2ZW50LmN1cnJlbnRUYXJnZXR8fGV2ZW50LnRhcmdldDtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlTZXJ2aWNlLmFkZCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy5lbC5uYXRpdmVFbGVtZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VsZkNsaWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoYXNUYXJnZXRDaGFuZ2VkKGV2ZW50LCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0ICE9IG51bGwgJiYgdGhpcy50YXJnZXQgIT09ICh0YXJnZXR8fGV2ZW50LmN1cnJlbnRUYXJnZXR8fGV2ZW50LnRhcmdldCk7XG4gICAgfVxuXG4gICAgYXBwZW5kQ29udGFpbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ24oKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLnNldCgnb3ZlcmxheScsIHRoaXMuY29udGFpbmVyLCB0aGlzLmJhc2VaSW5kZXggKyB0aGlzLmNvbmZpZy56SW5kZXgub3ZlcmxheSk7XG4gICAgICAgIH1cblxuICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5jb250YWluZXIsIHRoaXMudGFyZ2V0KTtcblxuICAgICAgICBjb25zdCBjb250YWluZXJPZmZzZXQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGNvbnN0IHRhcmdldE9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMudGFyZ2V0KTtcbiAgICAgICAgbGV0IGFycm93TGVmdCA9IDA7XG5cbiAgICAgICAgaWYgKGNvbnRhaW5lck9mZnNldC5sZWZ0IDwgdGFyZ2V0T2Zmc2V0LmxlZnQpIHtcbiAgICAgICAgICAgIGFycm93TGVmdCA9IHRhcmdldE9mZnNldC5sZWZ0IC0gY29udGFpbmVyT2Zmc2V0LmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoJy0tb3ZlcmxheUFycm93TGVmdCcsIGAke2Fycm93TGVmdH1weGApO1xuXG4gICAgICAgIGlmIChjb250YWluZXJPZmZzZXQudG9wIDwgdGFyZ2V0T2Zmc2V0LnRvcCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lciwgJ3Atb3ZlcmxheXBhbmVsLWZsaXBwZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAnb3BlbicpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZXZlbnQuZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMub25TaG93LmVtaXQobnVsbCk7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZENvbnRhaW5lcigpO1xuICAgICAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c09uU2hvdykge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vdmVybGF5RXZlbnRMaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZDbGljayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlTdWJzY3JpcHRpb24gPSB0aGlzLm92ZXJsYXlTZXJ2aWNlLmNsaWNrT2JzZXJ2YWJsZS5zdWJzY3JpYmUodGhpcy5vdmVybGF5RXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZXN0cm95Q2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95Q2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95Q2FsbGJhY2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25Db250YWluZXJEZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZGUuZW1pdCh7fSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIGxldCBmb2N1c2FibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsICdbYXV0b2ZvY3VzXScpO1xuICAgICAgICBpZiAoZm9jdXNhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZm9jdXNhYmxlLmZvY3VzKCksIDUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25DbG9zZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uV2luZG93UmVzaXplKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLnRhcmdldCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHVuYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29udGFpbmVyRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5kZXN0cm95Q2FsbGJhY2sgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZUFwcGVuZCgpO1xuICAgICAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUmlwcGxlTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtPdmVybGF5UGFuZWwsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbT3ZlcmxheVBhbmVsXVxufSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5UGFuZWxNb2R1bGUgeyB9XG4iXX0=