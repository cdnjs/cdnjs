import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, Output, NgModule } from '@angular/core';
import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';

const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}')
]);
const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);
class Sidebar {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.blockScroll = false;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.modal = true;
        this.dismissible = true;
        this.showCloseIcon = true;
        this.closeOnEscape = true;
        this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this._position = "left";
        this._fullScreen = false;
        this.transformOptions = "translate3d(-100%, 0px, 0px)";
    }
    ngAfterViewInit() {
        this.initialized = true;
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
    get visible() {
        return this._visible;
    }
    set visible(val) {
        this._visible = val;
    }
    get position() {
        return this._position;
    }
    ;
    set position(value) {
        this._position = value;
        switch (value) {
            case 'left':
                this.transformOptions = "translate3d(-100%, 0px, 0px)";
                break;
            case 'right':
                this.transformOptions = "translate3d(100%, 0px, 0px)";
                break;
            case 'bottom':
                this.transformOptions = "translate3d(0px, 100%, 0px)";
                break;
            case 'top':
                this.transformOptions = "translate3d(0px, -100%, 0px)";
                break;
        }
    }
    get fullScreen() {
        return this._fullScreen;
    }
    set fullScreen(value) {
        this._fullScreen = value;
        if (value)
            this.transformOptions = "none";
    }
    show() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
        if (this.modal) {
            this.enableModality();
        }
        this.onShow.emit({});
    }
    hide() {
        this.onHide.emit({});
        if (this.modal) {
            this.disableModality();
        }
    }
    close(event) {
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
            DomHandler.addMultipleClasses(this.mask, 'p-component-overlay p-sidebar-mask');
            if (this.dismissible) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', (event) => {
                    if (this.dismissible) {
                        this.close(event);
                    }
                });
            }
            document.body.appendChild(this.mask);
            if (this.blockScroll) {
                DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
        }
    }
    disableModality() {
        if (this.mask) {
            this.unbindMaskClickListener();
            document.body.removeChild(this.mask);
            if (this.blockScroll) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
            this.mask = null;
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.appendContainer();
                this.show();
                if (this.closeOnEscape) {
                    this.bindDocumentEscapeListener();
                }
                break;
            case 'void':
                this.hide();
                this.unbindGlobalListeners();
                break;
        }
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    bindDocumentEscapeListener() {
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
                    this.close(event);
                }
            }
        });
    }
    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    unbindGlobalListeners() {
        this.unbindMaskClickListener();
        this.unbindDocumentEscapeListener();
    }
    ngOnDestroy() {
        this.initialized = false;
        if (this.visible) {
            this.hide();
        }
        if (this.appendTo && this.container) {
            this.el.nativeElement.appendChild(this.container);
        }
        this.unbindGlobalListeners();
    }
}
Sidebar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Sidebar, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Sidebar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Sidebar, selector: "p-sidebar", inputs: { appendTo: "appendTo", blockScroll: "blockScroll", style: "style", styleClass: "styleClass", ariaCloseLabel: "ariaCloseLabel", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", modal: "modal", dismissible: "dismissible", showCloseIcon: "showCloseIcon", closeOnEscape: "closeOnEscape", transitionOptions: "transitionOptions", visible: "visible", position: "position", fullScreen: "fullScreen" }, outputs: { onShow: "onShow", onHide: "onHide", visibleChange: "visibleChange" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div #container [ngClass]="{'p-sidebar':true, 'p-sidebar-active': visible,
            'p-sidebar-left': (position === 'left' && !fullScreen), 'p-sidebar-right': (position === 'right' && !fullScreen),
            'p-sidebar-top': (position === 'top' && !fullScreen), 'p-sidebar-bottom': (position === 'bottom' && !fullScreen),
            'p-sidebar-full': fullScreen}"  *ngIf="visible" [@panelState]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@panelState.start)="onAnimationStart($event)" [ngStyle]="style" [class]="styleClass"  role="complementary" [attr.aria-modal]="modal">
            <div class="p-sidebar-header">
                <button type="button" class="p-sidebar-close p-sidebar-icon p-link" (click)="close($event)" (keydown.enter)="close($event)" [attr.aria-label]="ariaCloseLabel"  *ngIf="showCloseIcon" pRipple>
                    <span class="p-sidebar-close-icon pi pi-times"></span>
                </button>
            </div>
            <div class="p-sidebar-content">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: [".p-sidebar{position:fixed;transition:transform .3s;display:flex;flex-direction:column}.p-sidebar-content{position:relative;overflow-y:auto}.p-sidebar-header{display:flex;align-items:center;justify-content:flex-end}.p-sidebar-icon{display:flex;align-items:center;justify-content:center}.p-sidebar-mask{transition-property:background-color}.p-sidebar-mask,.p-sidebar-mask.p-sidebar-mask-leave.p-component-overlay{background-color:transparent}.p-sidebar-left{top:0;left:0;width:20rem;height:100%}.p-sidebar-right{top:0;right:0;width:20rem;height:100%}.p-sidebar-top{top:0;left:0;width:100%;height:10rem}.p-sidebar-bottom{bottom:0;left:0;width:100%;height:10rem}.p-sidebar-full{width:100%;height:100%;top:0;left:0;transition:none}.p-sidebar-left.p-sidebar-sm,.p-sidebar-right.p-sidebar-sm{width:20rem}.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-md{width:40rem}.p-sidebar-left.p-sidebar-lg,.p-sidebar-right.p-sidebar-lg{width:60rem}.p-sidebar-bottom.p-sidebar-sm,.p-sidebar-top.p-sidebar-sm{height:10rem}.p-sidebar-bottom.p-sidebar-md,.p-sidebar-top.p-sidebar-md{height:20rem}.p-sidebar-bottom.p-sidebar-lg,.p-sidebar-top.p-sidebar-lg{height:30rem}@media screen and (max-width:64em){.p-sidebar-left.p-sidebar-lg,.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-lg,.p-sidebar-right.p-sidebar-md{width:20rem}}"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.Ripple, selector: "[pRipple]" }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
        trigger('panelState', [
            transition('void => visible', [
                useAnimation(showAnimation)
            ]),
            transition('visible => void', [
                useAnimation(hideAnimation)
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Sidebar, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-sidebar',
                    template: `
        <div #container [ngClass]="{'p-sidebar':true, 'p-sidebar-active': visible,
            'p-sidebar-left': (position === 'left' && !fullScreen), 'p-sidebar-right': (position === 'right' && !fullScreen),
            'p-sidebar-top': (position === 'top' && !fullScreen), 'p-sidebar-bottom': (position === 'bottom' && !fullScreen),
            'p-sidebar-full': fullScreen}"  *ngIf="visible" [@panelState]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@panelState.start)="onAnimationStart($event)" [ngStyle]="style" [class]="styleClass"  role="complementary" [attr.aria-modal]="modal">
            <div class="p-sidebar-header">
                <button type="button" class="p-sidebar-close p-sidebar-icon p-link" (click)="close($event)" (keydown.enter)="close($event)" [attr.aria-label]="ariaCloseLabel"  *ngIf="showCloseIcon" pRipple>
                    <span class="p-sidebar-close-icon pi pi-times"></span>
                </button>
            </div>
            <div class="p-sidebar-content">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
        </div>
    `,
                    animations: [
                        trigger('panelState', [
                            transition('void => visible', [
                                useAnimation(showAnimation)
                            ]),
                            transition('visible => void', [
                                useAnimation(hideAnimation)
                            ])
                        ])
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./sidebar.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { appendTo: [{
                type: Input
            }], blockScroll: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], ariaCloseLabel: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], modal: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], showCloseIcon: [{
                type: Input
            }], closeOnEscape: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }], visible: [{
                type: Input
            }], position: [{
                type: Input
            }], fullScreen: [{
                type: Input
            }] } });
class SidebarModule {
}
SidebarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SidebarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SidebarModule, declarations: [Sidebar], imports: [CommonModule, RippleModule], exports: [Sidebar] });
SidebarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SidebarModule, imports: [[CommonModule, RippleModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule],
                    exports: [Sidebar],
                    declarations: [Sidebar]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Sidebar, SidebarModule };
//# sourceMappingURL=primeng-sidebar.js.map
