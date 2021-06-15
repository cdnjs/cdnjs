import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, ContentChildren, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import * as i2 from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import { trigger, state, style, transition, animate } from '@angular/animations';

class OverlayPanel {
    constructor(el, renderer, cd, zone) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.dismissable = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.focusOnShow = true;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.overlayVisible = false;
        this.render = false;
        this.isContainerClicked = true;
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
    onContainerClick() {
        this.isContainerClicked = true;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener && this.dismissable) {
            this.zone.runOutsideAngular(() => {
                let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
                const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                    if (!this.container.contains(event.target) && this.target !== event.target && !this.target.contains(event.target) && !this.isContainerClicked) {
                        this.zone.run(() => {
                            this.hide();
                        });
                    }
                    this.isContainerClicked = false;
                    this.cd.markForCheck();
                });
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
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
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
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
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                if (this.destroyCallback) {
                    this.destroyCallback();
                    this.destroyCallback = null;
                }
                break;
            case 'close':
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
        this.target = null;
        this.destroyCallback = null;
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    }
}
OverlayPanel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OverlayPanel, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
OverlayPanel.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: OverlayPanel, selector: "p-overlayPanel", inputs: { dismissable: "dismissable", showCloseIcon: "showCloseIcon", style: "style", styleClass: "styleClass", appendTo: "appendTo", autoZIndex: "autoZIndex", ariaCloseLabel: "ariaCloseLabel", baseZIndex: "baseZIndex", focusOnShow: "focusOnShow", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onShow: "onShow", onHide: "onHide" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div *ngIf="render" [ngClass]="'p-overlaypanel p-component'" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick()"
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
    `, isInline: true, styles: [".p-overlaypanel{position:absolute;margin-top:10px}.p-overlaypanel-flipped{margin-top:0;margin-bottom:10px}.p-overlaypanel-close{display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-overlaypanel:after,.p-overlaypanel:before{bottom:100%;left:calc(0 + 1.25rem);left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:\" \";height:0;width:0;position:absolute;pointer-events:none}.p-overlaypanel:after{border-width:8px;margin-left:-8px}.p-overlaypanel:before{border-width:10px;margin-left:-10px}.p-overlaypanel-shifted:after,.p-overlaypanel-shifted:before{left:auto;right:1.25em;margin-left:auto}.p-overlaypanel-flipped:after,.p-overlaypanel-flipped:before{bottom:auto;top:100%}.p-overlaypanel.p-overlaypanel-flipped:after,.p-overlaypanel.p-overlaypanel-flipped:before{border-bottom-color:transparent}"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.Ripple, selector: "[pRipple]" }], animations: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OverlayPanel, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-overlayPanel',
                    template: `
        <div *ngIf="render" [ngClass]="'p-overlaypanel p-component'" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick()"
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
                    styleUrls: ['./overlaypanel.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { dismissable: [{
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
class OverlayPanelModule {
}
OverlayPanelModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OverlayPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OverlayPanelModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OverlayPanelModule, declarations: [OverlayPanel], imports: [CommonModule, RippleModule, SharedModule], exports: [OverlayPanel, SharedModule] });
OverlayPanelModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OverlayPanelModule, imports: [[CommonModule, RippleModule, SharedModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: OverlayPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, SharedModule],
                    exports: [OverlayPanel, SharedModule],
                    declarations: [OverlayPanel]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { OverlayPanel, OverlayPanelModule };
//# sourceMappingURL=primeng-overlaypanel.js.map
