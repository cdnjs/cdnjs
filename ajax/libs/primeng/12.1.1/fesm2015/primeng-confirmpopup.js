import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from 'primeng/api';
import { TranslationKeys } from 'primeng/api';
import * as i3 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import { ZIndexUtils } from 'primeng/utils';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';

class ConfirmPopup {
    constructor(el, confirmationService, renderer, cd, config, overlayService) {
        this.el = el;
        this.confirmationService = confirmationService;
        this.renderer = renderer;
        this.cd = cd;
        this.config = config;
        this.overlayService = overlayService;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.subscription = this.confirmationService.requireConfirmation$.subscribe(confirmation => {
            if (!confirmation) {
                this.hide();
                return;
            }
            if (confirmation.key === this.key) {
                this.confirmation = confirmation;
                if (this.confirmation.accept) {
                    this.confirmation.acceptEvent = new EventEmitter();
                    this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
                }
                if (this.confirmation.reject) {
                    this.confirmation.rejectEvent = new EventEmitter();
                    this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
                }
                this.visible = true;
            }
        });
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        this.cd.markForCheck();
    }
    onAnimationStart(event) {
        if (event.toState === 'open') {
            this.container = event.element;
            document.body.appendChild(this.container);
            this.align();
            this.bindListeners();
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                break;
        }
    }
    align() {
        if (this.autoZIndex) {
            ZIndexUtils.set('overlay', this.container, this.config.zIndex.overlay);
        }
        DomHandler.absolutePosition(this.container, this.confirmation.target);
        const containerOffset = DomHandler.getOffset(this.container);
        const targetOffset = DomHandler.getOffset(this.confirmation.target);
        let arrowLeft = 0;
        if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left;
        }
        this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);
        if (containerOffset.top < targetOffset.top) {
            DomHandler.addClass(this.container, 'p-confirm-popup-flipped');
        }
    }
    hide() {
        this.visible = false;
    }
    accept() {
        if (this.confirmation.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }
        this.hide();
    }
    reject() {
        if (this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }
        this.hide();
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }
    bindListeners() {
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindScrollListener();
    }
    unbindListeners() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : document;
            this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                let targetElement = this.confirmation.target;
                if (this.container !== event.target && !this.container.contains(event.target) &&
                    targetElement !== event.target && !targetElement.contains(event.target)) {
                    this.hide();
                }
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    onWindowResize() {
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
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.confirmation.target, () => {
                if (this.visible) {
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
    unsubscribeConfirmationSubscriptions() {
        if (this.confirmation) {
            if (this.confirmation.acceptEvent) {
                this.confirmation.acceptEvent.unsubscribe();
            }
            if (this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.unsubscribe();
            }
        }
    }
    onContainerDestroy() {
        this.unbindListeners();
        this.unsubscribeConfirmationSubscriptions();
        if (this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }
        this.confirmation = null;
        this.container = null;
    }
    restoreAppend() {
        if (this.container) {
            document.body.removeChild(this.container);
        }
        this.onContainerDestroy();
    }
    get acceptButtonLabel() {
        return this.confirmation.acceptLabel || this.config.getTranslation(TranslationKeys.ACCEPT);
    }
    get rejectButtonLabel() {
        return this.confirmation.rejectLabel || this.config.getTranslation(TranslationKeys.REJECT);
    }
    ngOnDestroy() {
        this.restoreAppend();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
ConfirmPopup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ConfirmPopup, deps: [{ token: i0.ElementRef }, { token: i1.ConfirmationService }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
ConfirmPopup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ConfirmPopup, selector: "p-confirmPopup", inputs: { key: "key", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", style: "style", styleClass: "styleClass", visible: "visible" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div *ngIf="visible" [ngClass]="'p-confirm-popup p-component'" [ngStyle]="style" [class]="styleClass" (click)="onOverlayClick($event)"
            [@animation]="{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
            (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)">
            <div #content class="p-confirm-popup-content">
                <i [ngClass]="'p-confirm-popup-icon'" [class]="confirmation.icon" *ngIf="confirmation.icon"></i>
                <span class="p-confirm-popup-message">{{confirmation.message}}</span>
            </div>
            <div class="p-confirm-popup-footer">
                <button type="button" pButton [icon]="confirmation.rejectIcon" [label]="rejectButtonLabel" (click)="reject()" [ngClass]="'p-confirm-popup-reject p-button-sm'"
                    [class]="confirmation.rejectButtonStyleClass || 'p-button-text'" *ngIf="confirmation.rejectVisible !== false" [attr.aria-label]="rejectButtonLabel"></button>
                <button type="button" pButton [icon]="confirmation.acceptIcon" [label]="acceptButtonLabel" (click)="accept()" [ngClass]="'p-confirm-popup-accept p-button-sm'"
                    [class]="confirmation.acceptButtonStyleClass" *ngIf="confirmation.acceptVisible !== false" [attr.aria-label]="acceptButtonLabel"></button>
            </div>
        </div>
    `, isInline: true, styles: [".p-confirm-popup{position:absolute;margin-top:10px;top:0;left:0}.p-confirm-popup-flipped{margin-top:0;margin-bottom:10px}.p-confirm-popup:after,.p-confirm-popup:before{bottom:100%;left:calc(0 + 1.25rem);left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:\" \";height:0;width:0;position:absolute;pointer-events:none}.p-confirm-popup:after{border-width:8px;margin-left:-8px}.p-confirm-popup:before{border-width:10px;margin-left:-10px}.p-confirm-popup-flipped:after,.p-confirm-popup-flipped:before{bottom:auto;top:100%}.p-confirm-popup.p-confirm-popup-flipped:after,.p-confirm-popup.p-confirm-popup-flipped:before{border-bottom-color:transparent}.p-confirm-popup .p-confirm-popup-content{display:flex;align-items:center}"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], animations: [
        trigger('animation', [
            state('void', style({
                transform: 'scaleY(0.8)',
                opacity: 0
            })),
            state('open', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => open', animate('{{showTransitionParams}}')),
            transition('open => void', animate('{{hideTransitionParams}}')),
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ConfirmPopup, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-confirmPopup',
                    template: `
        <div *ngIf="visible" [ngClass]="'p-confirm-popup p-component'" [ngStyle]="style" [class]="styleClass" (click)="onOverlayClick($event)"
            [@animation]="{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
            (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)">
            <div #content class="p-confirm-popup-content">
                <i [ngClass]="'p-confirm-popup-icon'" [class]="confirmation.icon" *ngIf="confirmation.icon"></i>
                <span class="p-confirm-popup-message">{{confirmation.message}}</span>
            </div>
            <div class="p-confirm-popup-footer">
                <button type="button" pButton [icon]="confirmation.rejectIcon" [label]="rejectButtonLabel" (click)="reject()" [ngClass]="'p-confirm-popup-reject p-button-sm'"
                    [class]="confirmation.rejectButtonStyleClass || 'p-button-text'" *ngIf="confirmation.rejectVisible !== false" [attr.aria-label]="rejectButtonLabel"></button>
                <button type="button" pButton [icon]="confirmation.acceptIcon" [label]="acceptButtonLabel" (click)="accept()" [ngClass]="'p-confirm-popup-accept p-button-sm'"
                    [class]="confirmation.acceptButtonStyleClass" *ngIf="confirmation.acceptVisible !== false" [attr.aria-label]="acceptButtonLabel"></button>
            </div>
        </div>
    `,
                    animations: [
                        trigger('animation', [
                            state('void', style({
                                transform: 'scaleY(0.8)',
                                opacity: 0
                            })),
                            state('open', style({
                                transform: 'translateY(0)',
                                opacity: 1
                            })),
                            transition('void => open', animate('{{showTransitionParams}}')),
                            transition('open => void', animate('{{hideTransitionParams}}')),
                        ])
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./confirmpopup.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.ConfirmationService }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }]; }, propDecorators: { key: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], visible: [{
                type: Input
            }] } });
class ConfirmPopupModule {
}
ConfirmPopupModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ConfirmPopupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfirmPopupModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ConfirmPopupModule, declarations: [ConfirmPopup], imports: [CommonModule, ButtonModule], exports: [ConfirmPopup] });
ConfirmPopupModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ConfirmPopupModule, imports: [[CommonModule, ButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ConfirmPopupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule],
                    exports: [ConfirmPopup],
                    declarations: [ConfirmPopup]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ConfirmPopup, ConfirmPopupModule };
//# sourceMappingURL=primeng-confirmpopup.js.map
