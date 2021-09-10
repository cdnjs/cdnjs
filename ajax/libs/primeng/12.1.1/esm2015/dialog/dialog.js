import { NgModule, Component, Input, Output, EventEmitter, ContentChildren, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ContentChild } from '@angular/core';
import { trigger, style, transition, animate, animation, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Header, Footer, SharedModule, PrimeTemplate } from 'primeng/api';
import { FocusTrapModule } from 'primeng/focustrap';
import { RippleModule } from 'primeng/ripple';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/focustrap";
import * as i4 from "primeng/ripple";
const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}')
]);
const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);
export class Dialog {
    constructor(el, renderer, zone, cd, config) {
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.cd = cd;
        this.config = config;
        this.draggable = true;
        this.resizable = true;
        this.closeOnEscape = true;
        this.closable = true;
        this.showHeader = true;
        this.blockScroll = false;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.minX = 0;
        this.minY = 0;
        this.focusOnShow = true;
        this.keepInViewport = true;
        this.focusTrap = true;
        this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
        this.closeIcon = 'pi pi-times';
        this.minimizeIcon = 'pi pi-window-minimize';
        this.maximizeIcon = 'pi pi-window-maximize';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this.onResizeInit = new EventEmitter();
        this.onResizeEnd = new EventEmitter();
        this.onDragEnd = new EventEmitter();
        this.onMaximize = new EventEmitter();
        this.id = UniqueComponentId();
        this._style = {};
        this._position = "center";
        this.transformOptions = "scale(0.7)";
    }
    get positionLeft() {
        return 0;
    }
    ;
    set positionLeft(_positionLeft) {
        console.log("positionLeft property is deprecated.");
    }
    get positionTop() {
        return 0;
    }
    ;
    set positionTop(_positionTop) {
        console.log("positionTop property is deprecated.");
    }
    get responsive() {
        return false;
    }
    ;
    set responsive(_responsive) {
        console.log("Responsive property is deprecated.");
    }
    get breakpoint() {
        return 649;
    }
    ;
    set breakpoint(_breakpoint) {
        console.log("Breakpoint property is not utilized and deprecated, use breakpoints or CSS media queries instead.");
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    ngOnInit() {
        if (this.breakpoints) {
            this.createStyle();
        }
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }
    get style() {
        return this._style;
    }
    set style(value) {
        if (value) {
            this._style = Object.assign({}, value);
            this.originalStyle = value;
        }
    }
    get position() {
        return this._position;
    }
    ;
    set position(value) {
        this._position = value;
        switch (value) {
            case 'topleft':
            case 'bottomleft':
            case 'left':
                this.transformOptions = "translate3d(-100%, 0px, 0px)";
                break;
            case 'topright':
            case 'bottomright':
            case 'right':
                this.transformOptions = "translate3d(100%, 0px, 0px)";
                break;
            case 'bottom':
                this.transformOptions = "translate3d(0px, 100%, 0px)";
                break;
            case 'top':
                this.transformOptions = "translate3d(0px, -100%, 0px)";
                break;
            default:
                this.transformOptions = "scale(0.7)";
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
    close(event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    enableModality() {
        if (this.closable && this.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.close(event);
                }
            });
        }
        if (this.modal) {
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
    }
    disableModality() {
        if (this.wrapper) {
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }
            if (this.modal) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
            if (!this.cd.destroyed) {
                this.cd.detectChanges();
            }
        }
    }
    maximize() {
        this.maximized = !this.maximized;
        if (!this.modal && !this.blockScroll) {
            if (this.maximized)
                DomHandler.addClass(document.body, 'p-overflow-hidden');
            else
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
        this.onMaximize.emit({ 'maximized': this.maximized });
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex + this.config.zIndex.modal);
            this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
        }
    }
    createStyle() {
        if (!this.styleElement) {
            this.styleElement = document.createElement('style');
            this.styleElement.type = 'text/css';
            document.head.appendChild(this.styleElement);
            let innerHTML = '';
            for (let breakpoint in this.breakpoints) {
                innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-dialog[${this.id}] {
                            width: ${this.breakpoints[breakpoint]} !important;
                        }
                    }
                `;
            }
            this.styleElement.innerHTML = innerHTML;
        }
    }
    initDrag(event) {
        if (DomHandler.hasClass(event.target, 'p-dialog-header-icon') || DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
            return;
        }
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.container.style.margin = '0';
            DomHandler.addClass(document.body, 'p-unselectable-text');
        }
    }
    onKeydown(event) {
        if (this.focusTrap) {
            if (event.which === 9) {
                event.preventDefault();
                let focusableElements = DomHandler.getFocusableElements(this.container);
                if (focusableElements && focusableElements.length > 0) {
                    if (!focusableElements[0].ownerDocument.activeElement) {
                        focusableElements[0].focus();
                    }
                    else {
                        let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                        if (event.shiftKey) {
                            if (focusedIndex == -1 || focusedIndex === 0)
                                focusableElements[focusableElements.length - 1].focus();
                            else
                                focusableElements[focusedIndex - 1].focus();
                        }
                        else {
                            if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                focusableElements[0].focus();
                            else
                                focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
        }
    }
    onDrag(event) {
        if (this.dragging) {
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let offset = DomHandler.getOffset(this.container);
            let leftPos = offset.left + deltaX;
            let topPos = offset.top + deltaY;
            let viewport = DomHandler.getViewport();
            this.container.style.position = 'fixed';
            if (this.keepInViewport) {
                if (leftPos >= this.minX && (leftPos + containerWidth) < viewport.width) {
                    this._style.left = leftPos + 'px';
                    this.lastPageX = event.pageX;
                    this.container.style.left = leftPos + 'px';
                }
                if (topPos >= this.minY && (topPos + containerHeight) < viewport.height) {
                    this._style.top = topPos + 'px';
                    this.lastPageY = event.pageY;
                    this.container.style.top = topPos + 'px';
                }
            }
            else {
                this.lastPageX = event.pageX;
                this.container.style.left = leftPos + 'px';
                this.lastPageY = event.pageY;
                this.container.style.top = topPos + 'px';
            }
        }
    }
    endDrag(event) {
        if (this.dragging) {
            this.dragging = false;
            DomHandler.removeClass(document.body, 'p-unselectable-text');
            this.cd.detectChanges();
            this.onDragEnd.emit(event);
        }
    }
    resetPosition() {
        this.container.style.position = '';
        this.container.style.left = '';
        this.container.style.top = '';
        this.container.style.margin = '';
    }
    //backward compatibility
    center() {
        this.resetPosition();
    }
    initResize(event) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(document.body, 'p-unselectable-text');
            this.onResizeInit.emit(event);
        }
    }
    onResize(event) {
        if (this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let contentHeight = DomHandler.getOuterHeight(this.contentViewChild.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = this.container.style.minWidth;
            let minHeight = this.container.style.minHeight;
            let offset = DomHandler.getOffset(this.container);
            let viewport = DomHandler.getViewport();
            let hasBeenDragged = !parseInt(this.container.style.top) || !parseInt(this.container.style.left);
            if (hasBeenDragged) {
                newWidth += deltaX;
                newHeight += deltaY;
            }
            if ((!minWidth || newWidth > parseInt(minWidth)) && (offset.left + newWidth) < viewport.width) {
                this._style.width = newWidth + 'px';
                this.container.style.width = this._style.width;
            }
            if ((!minHeight || newHeight > parseInt(minHeight)) && (offset.top + newHeight) < viewport.height) {
                this.contentViewChild.nativeElement.style.height = contentHeight + newHeight - containerHeight + 'px';
                if (this._style.height) {
                    this._style.height = newHeight + 'px';
                    this.container.style.height = this._style.height;
                }
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    resizeEnd(event) {
        if (this.resizing) {
            this.resizing = false;
            DomHandler.removeClass(document.body, 'p-unselectable-text');
            this.onResizeEnd.emit(event);
        }
    }
    bindGlobalListeners() {
        if (this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }
        if (this.resizable) {
            this.bindDocumentResizeListeners();
        }
        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    }
    unbindGlobalListeners() {
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentEscapeListener();
    }
    bindDocumentDragListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragListener = this.onDrag.bind(this);
            window.document.addEventListener('mousemove', this.documentDragListener);
        });
    }
    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            window.document.removeEventListener('mousemove', this.documentDragListener);
            this.documentDragListener = null;
        }
    }
    bindDocumentDragEndListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragEndListener = this.endDrag.bind(this);
            window.document.addEventListener('mouseup', this.documentDragEndListener);
        });
    }
    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            window.document.removeEventListener('mouseup', this.documentDragEndListener);
            this.documentDragEndListener = null;
        }
    }
    bindDocumentResizeListeners() {
        this.zone.runOutsideAngular(() => {
            this.documentResizeListener = this.onResize.bind(this);
            this.documentResizeEndListener = this.resizeEnd.bind(this);
            window.document.addEventListener('mousemove', this.documentResizeListener);
            window.document.addEventListener('mouseup', this.documentResizeEndListener);
        });
    }
    unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            window.document.removeEventListener('mousemove', this.documentResizeListener);
            window.document.removeEventListener('mouseup', this.documentResizeEndListener);
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }
    bindDocumentEscapeListener() {
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                this.close(event);
            }
        });
    }
    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.wrapper);
            else
                DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }
    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.wrapper);
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.container.setAttribute(this.id, '');
                if (this.modal) {
                    this.enableModality();
                }
                if (!this.modal && this.blockScroll) {
                    DomHandler.addClass(document.body, 'p-overflow-hidden');
                }
                if (this.focusOnShow) {
                    this.focus();
                }
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                break;
            case 'visible':
                this.onShow.emit({});
                break;
        }
    }
    onContainerDestroy() {
        this.unbindGlobalListeners();
        this.dragging = false;
        this.maskVisible = false;
        if (this.maximized) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
            this.maximized = false;
        }
        if (this.modal) {
            this.disableModality();
        }
        if (this.blockScroll) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }
        this.container = null;
        this.wrapper = null;
        this._style = this.originalStyle ? Object.assign({}, this.originalStyle) : {};
    }
    destroyStyle() {
        if (this.styleElement) {
            document.head.removeChild(this.styleElement);
            this.styleElement = null;
        }
    }
    ngOnDestroy() {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
        this.destroyStyle();
    }
}
Dialog.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Dialog, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
Dialog.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Dialog, selector: "p-dialog", inputs: { header: "header", draggable: "draggable", resizable: "resizable", positionLeft: "positionLeft", positionTop: "positionTop", contentStyle: "contentStyle", contentStyleClass: "contentStyleClass", modal: "modal", closeOnEscape: "closeOnEscape", dismissableMask: "dismissableMask", rtl: "rtl", closable: "closable", responsive: "responsive", appendTo: "appendTo", breakpoints: "breakpoints", styleClass: "styleClass", maskStyleClass: "maskStyleClass", showHeader: "showHeader", breakpoint: "breakpoint", blockScroll: "blockScroll", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", minX: "minX", minY: "minY", focusOnShow: "focusOnShow", maximizable: "maximizable", keepInViewport: "keepInViewport", focusTrap: "focusTrap", transitionOptions: "transitionOptions", closeIcon: "closeIcon", closeAriaLabel: "closeAriaLabel", minimizeIcon: "minimizeIcon", maximizeIcon: "maximizeIcon", visible: "visible", style: "style", position: "position" }, outputs: { onShow: "onShow", onHide: "onHide", visibleChange: "visibleChange", onResizeInit: "onResizeInit", onResizeEnd: "onResizeEnd", onDragEnd: "onDragEnd", onMaximize: "onMaximize" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "headerFacet", first: true, predicate: Header, descendants: true }, { propertyName: "footerFacet", first: true, predicate: Footer, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "headerViewChild", first: true, predicate: ["titlebar"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }, { propertyName: "footerViewChild", first: true, predicate: ["footer"], descendants: true }], ngImport: i0, template: `
        <div *ngIf="maskVisible" [class]="maskStyleClass"
            [ngClass]="{'p-dialog-mask': true, 'p-component-overlay': this.modal, 'p-dialog-mask-scrollblocker': this.modal || this.blockScroll,
                'p-dialog-left': position === 'left',
                'p-dialog-right': position === 'right',
                'p-dialog-top': position === 'top',
                'p-dialog-top-left': position === 'topleft' || position === 'top-left',
                'p-dialog-top-right': position === 'topright' || position === 'top-right',
                'p-dialog-bottom': position === 'bottom',
                'p-dialog-bottom-left': position === 'bottomleft' || position === 'bottom-left',
                'p-dialog-bottom-right': position === 'bottomright' || position === 'bottom-right'}">
            <div #container [ngClass]="{'p-dialog p-component':true, 'p-dialog-rtl':rtl,'p-dialog-draggable':draggable,'p-dialog-resizable':resizable, 'p-dialog-maximized': maximized}"
                [ngStyle]="style" [class]="styleClass" *ngIf="visible" pFocusTrap [pFocusTrapDisabled]="focusTrap === false"
                [@animation]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" [attr.aria-labelledby]="id + '-label'">
                <div #titlebar class="p-dialog-header" (mousedown)="initDrag($event)" *ngIf="showHeader">
                    <span [attr.id]="id + '-label'" class="p-dialog-title" *ngIf="!headerFacet && !headerTemplate">{{header}}</span>
                    <span [attr.id]="id + '-label'" class="p-dialog-title" *ngIf="headerFacet">
                        <ng-content select="p-header"></ng-content>
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="maximizable" type="button" [ngClass]="{'p-dialog-header-icon p-dialog-header-maximize p-link':true}" (click)="maximize()" (keydown.enter)="maximize()" tabindex="-1" pRipple>
                            <span class="p-dialog-header-maximize-icon" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                        </button>
                        <button *ngIf="closable" type="button" [ngClass]="{'p-dialog-header-icon p-dialog-header-close p-link':true}" [attr.aria-label]="closeAriaLabel" (click)="close($event)" (keydown.enter)="close($event)" tabindex="-1" pRipple>
                            <span class="p-dialog-header-close-icon" [ngClass]="closeIcon"></span>
                        </button>
                    </div>
                </div>
                <div #content [ngClass]="'p-dialog-content'" [ngStyle]="contentStyle" [class]="contentStyleClass">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                <div #footer class="p-dialog-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
                <div *ngIf="resizable" class="p-resizable-handle" style="z-index: 90;" (mousedown)="initResize($event)"></div>
            </div>
        </div>
    `, isInline: true, styles: [".p-dialog-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;pointer-events:none;background-color:transparent;transition-property:background-color}.p-dialog,.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{display:flex;flex-direction:column;max-height:90%;transform:scale(1);position:relative}.p-dialog-content{overflow-y:auto;flex-grow:1}.p-dialog-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}.p-dialog-footer{flex-shrink:0}.p-dialog .p-dialog-header-icons{display:flex;align-items:center}.p-dialog .p-dialog-header-icon{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-dialog-mask.p-dialog-mask-leave{background-color:transparent}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-top .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{transition:none;transform:none;width:100vw!important;height:100vh!important;top:0!important;left:0!important;max-height:100%;height:100%}.p-dialog-maximized .p-dialog-content{flex-grow:1}.p-dialog-left{justify-content:flex-start}.p-dialog-right{justify-content:flex-end}.p-dialog-top,.p-dialog-top-left{align-items:flex-start}.p-dialog-top-left{justify-content:flex-start}.p-dialog-top-right{justify-content:flex-end;align-items:flex-start}.p-dialog-bottom{align-items:flex-end}.p-dialog-bottom-left{justify-content:flex-start;align-items:flex-end}.p-dialog-bottom-right{justify-content:flex-end;align-items:flex-end}.p-dialog .p-resizable-handle{position:absolute;font-size:.1px;display:block;cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}.p-confirm-dialog .p-dialog-content{display:flex;align-items:center}"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.FocusTrap, selector: "[pFocusTrap]", inputs: ["pFocusTrapDisabled"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.Ripple, selector: "[pRipple]" }], animations: [
        trigger('animation', [
            transition('void => visible', [
                useAnimation(showAnimation)
            ]),
            transition('visible => void', [
                useAnimation(hideAnimation)
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Dialog, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-dialog',
                    template: `
        <div *ngIf="maskVisible" [class]="maskStyleClass"
            [ngClass]="{'p-dialog-mask': true, 'p-component-overlay': this.modal, 'p-dialog-mask-scrollblocker': this.modal || this.blockScroll,
                'p-dialog-left': position === 'left',
                'p-dialog-right': position === 'right',
                'p-dialog-top': position === 'top',
                'p-dialog-top-left': position === 'topleft' || position === 'top-left',
                'p-dialog-top-right': position === 'topright' || position === 'top-right',
                'p-dialog-bottom': position === 'bottom',
                'p-dialog-bottom-left': position === 'bottomleft' || position === 'bottom-left',
                'p-dialog-bottom-right': position === 'bottomright' || position === 'bottom-right'}">
            <div #container [ngClass]="{'p-dialog p-component':true, 'p-dialog-rtl':rtl,'p-dialog-draggable':draggable,'p-dialog-resizable':resizable, 'p-dialog-maximized': maximized}"
                [ngStyle]="style" [class]="styleClass" *ngIf="visible" pFocusTrap [pFocusTrapDisabled]="focusTrap === false"
                [@animation]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" [attr.aria-labelledby]="id + '-label'">
                <div #titlebar class="p-dialog-header" (mousedown)="initDrag($event)" *ngIf="showHeader">
                    <span [attr.id]="id + '-label'" class="p-dialog-title" *ngIf="!headerFacet && !headerTemplate">{{header}}</span>
                    <span [attr.id]="id + '-label'" class="p-dialog-title" *ngIf="headerFacet">
                        <ng-content select="p-header"></ng-content>
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="maximizable" type="button" [ngClass]="{'p-dialog-header-icon p-dialog-header-maximize p-link':true}" (click)="maximize()" (keydown.enter)="maximize()" tabindex="-1" pRipple>
                            <span class="p-dialog-header-maximize-icon" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                        </button>
                        <button *ngIf="closable" type="button" [ngClass]="{'p-dialog-header-icon p-dialog-header-close p-link':true}" [attr.aria-label]="closeAriaLabel" (click)="close($event)" (keydown.enter)="close($event)" tabindex="-1" pRipple>
                            <span class="p-dialog-header-close-icon" [ngClass]="closeIcon"></span>
                        </button>
                    </div>
                </div>
                <div #content [ngClass]="'p-dialog-content'" [ngStyle]="contentStyle" [class]="contentStyleClass">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                <div #footer class="p-dialog-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
                <div *ngIf="resizable" class="p-resizable-handle" style="z-index: 90;" (mousedown)="initResize($event)"></div>
            </div>
        </div>
    `,
                    animations: [
                        trigger('animation', [
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
                    styleUrls: ['../dialog/dialog.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }]; }, propDecorators: { header: [{
                type: Input
            }], draggable: [{
                type: Input
            }], resizable: [{
                type: Input
            }], positionLeft: [{
                type: Input
            }], positionTop: [{
                type: Input
            }], contentStyle: [{
                type: Input
            }], contentStyleClass: [{
                type: Input
            }], modal: [{
                type: Input
            }], closeOnEscape: [{
                type: Input
            }], dismissableMask: [{
                type: Input
            }], rtl: [{
                type: Input
            }], closable: [{
                type: Input
            }], responsive: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], breakpoints: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], maskStyleClass: [{
                type: Input
            }], showHeader: [{
                type: Input
            }], breakpoint: [{
                type: Input
            }], blockScroll: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], minX: [{
                type: Input
            }], minY: [{
                type: Input
            }], focusOnShow: [{
                type: Input
            }], maximizable: [{
                type: Input
            }], keepInViewport: [{
                type: Input
            }], focusTrap: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], closeIcon: [{
                type: Input
            }], closeAriaLabel: [{
                type: Input
            }], minimizeIcon: [{
                type: Input
            }], maximizeIcon: [{
                type: Input
            }], headerFacet: [{
                type: ContentChild,
                args: [Header]
            }], footerFacet: [{
                type: ContentChild,
                args: [Footer]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], headerViewChild: [{
                type: ViewChild,
                args: ['titlebar']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], footerViewChild: [{
                type: ViewChild,
                args: ['footer']
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }], onResizeInit: [{
                type: Output
            }], onResizeEnd: [{
                type: Output
            }], onDragEnd: [{
                type: Output
            }], onMaximize: [{
                type: Output
            }], visible: [{
                type: Input
            }], style: [{
                type: Input
            }], position: [{
                type: Input
            }] } });
export class DialogModule {
}
DialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DialogModule, declarations: [Dialog], imports: [CommonModule, FocusTrapModule, RippleModule], exports: [Dialog, SharedModule] });
DialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DialogModule, imports: [[CommonModule, FocusTrapModule, RippleModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FocusTrapModule, RippleModule],
                    exports: [Dialog, SharedModule],
                    declarations: [Dialog]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQXNCLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUNyRSxlQUFlLEVBQVcsU0FBUyxFQUFtQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBaUMsWUFBWSxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ2hNLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQWtCLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUUsYUFBYSxFQUFnQixNQUFNLGFBQWEsQ0FBQztBQUNyRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUU3RCxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDNUIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDakQsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0NBQzVCLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUM1QixPQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFP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QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxlQUFlLEVBQUMsWUFBWSxDQUFDO29CQUNwRCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsWUFBWSxDQUFDO29CQUM5QixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUJBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixSZW5kZXJlcjIsXG4gICAgQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxWaWV3Q2hpbGQsTmdab25lLCBDaGFuZ2VEZXRlY3RvclJlZixWaWV3UmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQWZ0ZXJDb250ZW50SW5pdCwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHJpZ2dlcixzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBhbmltYXRpb24sIHVzZUFuaW1hdGlvbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHtIZWFkZXIsRm9vdGVyLFNoYXJlZE1vZHVsZSwgUHJpbWVUZW1wbGF0ZSwgUHJpbWVOR0NvbmZpZ30gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtGb2N1c1RyYXBNb2R1bGV9IGZyb20gJ3ByaW1lbmcvZm9jdXN0cmFwJztcbmltcG9ydCB7UmlwcGxlTW9kdWxlfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQge1VuaXF1ZUNvbXBvbmVudElkLCBaSW5kZXhVdGlsc30gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbmNvbnN0IHNob3dBbmltYXRpb24gPSBhbmltYXRpb24oW1xuICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAne3t0cmFuc2Zvcm19fScsIG9wYWNpdHk6IDAgfSksXG4gICAgYW5pbWF0ZSgne3t0cmFuc2l0aW9ufX0nKVxuXSk7XG5cbmNvbnN0IGhpZGVBbmltYXRpb24gPSBhbmltYXRpb24oW1xuICAgIGFuaW1hdGUoJ3t7dHJhbnNpdGlvbn19Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybX19Jywgb3BhY2l0eTogMCB9KSlcbl0pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWFza1Zpc2libGVcIiBbY2xhc3NdPVwibWFza1N0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLWRpYWxvZy1tYXNrJzogdHJ1ZSwgJ3AtY29tcG9uZW50LW92ZXJsYXknOiB0aGlzLm1vZGFsLCAncC1kaWFsb2ctbWFzay1zY3JvbGxibG9ja2VyJzogdGhpcy5tb2RhbCB8fCB0aGlzLmJsb2NrU2Nyb2xsLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy1sZWZ0JzogcG9zaXRpb24gPT09ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctcmlnaHQnOiBwb3NpdGlvbiA9PT0gJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctdG9wJzogcG9zaXRpb24gPT09ICd0b3AnLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy10b3AtbGVmdCc6IHBvc2l0aW9uID09PSAndG9wbGVmdCcgfHwgcG9zaXRpb24gPT09ICd0b3AtbGVmdCcsXG4gICAgICAgICAgICAgICAgJ3AtZGlhbG9nLXRvcC1yaWdodCc6IHBvc2l0aW9uID09PSAndG9wcmlnaHQnIHx8IHBvc2l0aW9uID09PSAndG9wLXJpZ2h0JyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctYm90dG9tJzogcG9zaXRpb24gPT09ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy1ib3R0b20tbGVmdCc6IHBvc2l0aW9uID09PSAnYm90dG9tbGVmdCcgfHwgcG9zaXRpb24gPT09ICdib3R0b20tbGVmdCcsXG4gICAgICAgICAgICAgICAgJ3AtZGlhbG9nLWJvdHRvbS1yaWdodCc6IHBvc2l0aW9uID09PSAnYm90dG9tcmlnaHQnIHx8IHBvc2l0aW9uID09PSAnYm90dG9tLXJpZ2h0J31cIj5cbiAgICAgICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJ7J3AtZGlhbG9nIHAtY29tcG9uZW50Jzp0cnVlLCAncC1kaWFsb2ctcnRsJzpydGwsJ3AtZGlhbG9nLWRyYWdnYWJsZSc6ZHJhZ2dhYmxlLCdwLWRpYWxvZy1yZXNpemFibGUnOnJlc2l6YWJsZSwgJ3AtZGlhbG9nLW1heGltaXplZCc6IG1heGltaXplZH1cIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cInZpc2libGVcIiBwRm9jdXNUcmFwIFtwRm9jdXNUcmFwRGlzYWJsZWRdPVwiZm9jdXNUcmFwID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgW0BhbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3RyYW5zZm9ybTogdHJhbnNmb3JtT3B0aW9ucywgdHJhbnNpdGlvbjogdHJhbnNpdGlvbk9wdGlvbnN9fVwiIChAYW5pbWF0aW9uLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIChAYW5pbWF0aW9uLmRvbmUpPVwib25BbmltYXRpb25FbmQoJGV2ZW50KVwiIHJvbGU9XCJkaWFsb2dcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaWQgKyAnLWxhYmVsJ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgI3RpdGxlYmFyIGNsYXNzPVwicC1kaWFsb2ctaGVhZGVyXCIgKG1vdXNlZG93bik9XCJpbml0RHJhZygkZXZlbnQpXCIgKm5nSWY9XCJzaG93SGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFthdHRyLmlkXT1cImlkICsgJy1sYWJlbCdcIiBjbGFzcz1cInAtZGlhbG9nLXRpdGxlXCIgKm5nSWY9XCIhaGVhZGVyRmFjZXQgJiYgIWhlYWRlclRlbXBsYXRlXCI+e3toZWFkZXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2F0dHIuaWRdPVwiaWQgKyAnLWxhYmVsJ1wiIGNsYXNzPVwicC1kaWFsb2ctdGl0bGVcIiAqbmdJZj1cImhlYWRlckZhY2V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGlhbG9nLWhlYWRlci1pY29uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIm1heGltaXphYmxlXCIgdHlwZT1cImJ1dHRvblwiIFtuZ0NsYXNzXT1cInsncC1kaWFsb2ctaGVhZGVyLWljb24gcC1kaWFsb2ctaGVhZGVyLW1heGltaXplIHAtbGluayc6dHJ1ZX1cIiAoY2xpY2spPVwibWF4aW1pemUoKVwiIChrZXlkb3duLmVudGVyKT1cIm1heGltaXplKClcIiB0YWJpbmRleD1cIi0xXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZGlhbG9nLWhlYWRlci1tYXhpbWl6ZS1pY29uXCIgW25nQ2xhc3NdPVwibWF4aW1pemVkID8gbWluaW1pemVJY29uIDogbWF4aW1pemVJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY2xvc2FibGVcIiB0eXBlPVwiYnV0dG9uXCIgW25nQ2xhc3NdPVwieydwLWRpYWxvZy1oZWFkZXItaWNvbiBwLWRpYWxvZy1oZWFkZXItY2xvc2UgcC1saW5rJzp0cnVlfVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiY2xvc2VBcmlhTGFiZWxcIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIiB0YWJpbmRleD1cIi0xXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZGlhbG9nLWhlYWRlci1jbG9zZS1pY29uXCIgW25nQ2xhc3NdPVwiY2xvc2VJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgW25nQ2xhc3NdPVwiJ3AtZGlhbG9nLWNvbnRlbnQnXCIgW25nU3R5bGVdPVwiY29udGVudFN0eWxlXCIgW2NsYXNzXT1cImNvbnRlbnRTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgI2Zvb3RlciBjbGFzcz1cInAtZGlhbG9nLWZvb3RlclwiICpuZ0lmPVwiZm9vdGVyRmFjZXQgfHwgZm9vdGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJyZXNpemFibGVcIiBjbGFzcz1cInAtcmVzaXphYmxlLWhhbmRsZVwiIHN0eWxlPVwiei1pbmRleDogOTA7XCIgKG1vdXNlZG93bik9XCJpbml0UmVzaXplKCRldmVudClcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignYW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgW1xuICAgICAgICAgICAgICAgIHVzZUFuaW1hdGlvbihzaG93QW5pbWF0aW9uKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBbXG4gICAgICAgICAgICAgICAgdXNlQW5pbWF0aW9uKGhpZGVBbmltYXRpb24pXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi4vZGlhbG9nL2RpYWxvZy5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2cgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LE9uSW5pdCxPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkcmFnZ2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcmVzaXphYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGdldCBwb3NpdGlvbkxlZnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcblxuICAgIHNldCBwb3NpdGlvbkxlZnQoX3Bvc2l0aW9uTGVmdDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicG9zaXRpb25MZWZ0IHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuXCIpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBwb3NpdGlvblRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuXG4gICAgc2V0IHBvc2l0aW9uVG9wKF9wb3NpdGlvblRvcDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicG9zaXRpb25Ub3AgcHJvcGVydHkgaXMgZGVwcmVjYXRlZC5cIik7XG4gICAgfVxuXG4gICAgQElucHV0KCkgY29udGVudFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBjb250ZW50U3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbW9kYWw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjbG9zZU9uRXNjYXBlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGRpc21pc3NhYmxlTWFzazogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHJ0bDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGdldCByZXNwb25zaXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHNldCByZXNwb25zaXZlKF9yZXNwb25zaXZlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2l2ZSBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLlwiKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgYnJlYWtwb2ludHM6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG1hc2tTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzaG93SGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGdldCBicmVha3BvaW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiA2NDk7XG4gICAgfTtcblxuICAgIHNldCBicmVha3BvaW50KF9icmVha3BvaW50OiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IHByb3BlcnR5IGlzIG5vdCB1dGlsaXplZCBhbmQgZGVwcmVjYXRlZCwgdXNlIGJyZWFrcG9pbnRzIG9yIENTUyBtZWRpYSBxdWVyaWVzIGluc3RlYWQuXCIpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGJsb2NrU2Nyb2xsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBtaW5YOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgbWluWTogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIGZvY3VzT25TaG93OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIG1heGltaXphYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkga2VlcEluVmlld3BvcnQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZm9jdXNUcmFwOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuXG4gICAgQElucHV0KCkgY2xvc2VJY29uOiBzdHJpbmcgPSAncGkgcGktdGltZXMnO1xuXG4gICAgQElucHV0KCkgY2xvc2VBcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG1pbmltaXplSWNvbjogc3RyaW5nID0gJ3BpIHBpLXdpbmRvdy1taW5pbWl6ZSc7XG5cbiAgICBASW5wdXQoKSBtYXhpbWl6ZUljb246IHN0cmluZyA9ICdwaSBwaS13aW5kb3ctbWF4aW1pemUnO1xuXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIpIGhlYWRlckZhY2V0OiBRdWVyeUxpc3Q8SGVhZGVyPjtcblxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXJGYWNldDogUXVlcnlMaXN0PEZvb3Rlcj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBAVmlld0NoaWxkKCd0aXRsZWJhcicpIGhlYWRlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnZm9vdGVyJykgZm9vdGVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSB2aXNpYmxlQ2hhbmdlOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uUmVzaXplSW5pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25SZXNpemVFbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRHJhZ0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25NYXhpbWl6ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgX3Zpc2libGU6IGJvb2xlYW47XG5cbiAgICBtYXNrVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICB3cmFwcGVyOiBIVE1MRWxlbWVudDtcblxuICAgIGRyYWdnaW5nOiBib29sZWFuO1xuXG4gICAgZG9jdW1lbnREcmFnTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50RHJhZ0VuZExpc3RlbmVyOiBhbnk7XG5cbiAgICByZXNpemluZzogYm9vbGVhbjtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50RXNjYXBlTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgbWFza0NsaWNrTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgbGFzdFBhZ2VYOiBudW1iZXI7XG5cbiAgICBsYXN0UGFnZVk6IG51bWJlcjtcblxuICAgIHByZXZlbnRWaXNpYmxlQ2hhbmdlUHJvcGFnYXRpb246IGJvb2xlYW47XG5cbiAgICBtYXhpbWl6ZWQ6IGJvb2xlYW47XG5cbiAgICBwcmVNYXhpbWl6ZUNvbnRlbnRIZWlnaHQ6IG51bWJlcjtcblxuICAgIHByZU1heGltaXplQ29udGFpbmVyV2lkdGg6IG51bWJlcjtcblxuICAgIHByZU1heGltaXplQ29udGFpbmVySGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwcmVNYXhpbWl6ZVBhZ2VYOiBudW1iZXI7XG5cbiAgICBwcmVNYXhpbWl6ZVBhZ2VZOiBudW1iZXI7XG5cbiAgICBpZDogc3RyaW5nID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcblxuICAgIF9zdHlsZTogYW55ID0ge307XG5cbiAgICBfcG9zaXRpb246IHN0cmluZyA9IFwiY2VudGVyXCI7XG5cbiAgICBvcmlnaW5hbFN0eWxlOiBhbnk7XG5cbiAgICB0cmFuc2Zvcm1PcHRpb25zOiBhbnkgPSBcInNjYWxlKDAuNylcIjtcblxuICAgIHN0eWxlRWxlbWVudDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcpIHsgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgdmlzaWJsZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG4gICAgc2V0IHZpc2libGUodmFsdWU6YW55KSB7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSAmJiAhdGhpcy5tYXNrVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgc3R5bGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICAgIH1cbiAgICBzZXQgc3R5bGUodmFsdWU6YW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSB7Li4udmFsdWV9O1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFN0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgcG9zaXRpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICAgIH07XG5cbiAgICBzZXQgcG9zaXRpb24odmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcGxlZnQnOlxuICAgICAgICAgICAgY2FzZSAnYm90dG9tbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKC0xMDAlLCAwcHgsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wcmlnaHQnOlxuICAgICAgICAgICAgY2FzZSAnYm90dG9tcmlnaHQnOlxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9IFwidHJhbnNsYXRlM2QoMTAwJSwgMHB4LCAwcHgpXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gXCJ0cmFuc2xhdGUzZCgwcHgsIDEwMCUsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKDBweCwgLTEwMCUsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInNjYWxlKDAuNylcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIGxldCBmb2N1c2FibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsICdbYXV0b2ZvY3VzXScpO1xuICAgICAgICBpZiAoZm9jdXNhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZm9jdXNhYmxlLmZvY3VzKCksIDUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGVuYWJsZU1vZGFsaXR5KCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zYWJsZSAmJiB0aGlzLmRpc21pc3NhYmxlTWFzaykge1xuICAgICAgICAgICAgdGhpcy5tYXNrQ2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMud3JhcHBlciwgJ21vdXNlZG93bicsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud3JhcHBlciAmJiB0aGlzLndyYXBwZXIuaXNTYW1lTm9kZShldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLndyYXBwZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc21pc3NhYmxlTWFzaykge1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISh0aGlzLmNkIGFzIFZpZXdSZWYpLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWF4aW1pemUoKSB7XG4gICAgICAgIHRoaXMubWF4aW1pemVkID0gIXRoaXMubWF4aW1pemVkO1xuXG4gICAgICAgIGlmICghdGhpcy5tb2RhbCAmJiAhdGhpcy5ibG9ja1Njcm9sbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWF4aW1pemVkKVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25NYXhpbWl6ZS5lbWl0KHsnbWF4aW1pemVkJzogdGhpcy5tYXhpbWl6ZWR9KTtcbiAgICB9XG5cbiAgICB1bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMubWFza0NsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZU9uVG9wKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ21vZGFsJywgdGhpcy5jb250YWluZXIsIHRoaXMuYmFzZVpJbmRleCArIHRoaXMuY29uZmlnLnpJbmRleC5tb2RhbCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXIuc3R5bGUuekluZGV4ID0gU3RyaW5nKHBhcnNlSW50KHRoaXMuY29udGFpbmVyLnN0eWxlLnpJbmRleCwgMTApIC0gMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVTdHlsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICAgICAgICAgIGxldCBpbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGZvciAobGV0IGJyZWFrcG9pbnQgaW4gdGhpcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgICAgIGlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7YnJlYWtwb2ludH0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wLWRpYWxvZ1ske3RoaXMuaWR9XSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICR7dGhpcy5icmVha3BvaW50c1ticmVha3BvaW50XX0gIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdERyYWcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1kaWFsb2ctaGVhZGVyLWljb24nKSB8fMKgRG9tSGFuZGxlci5oYXNDbGFzcygoPEhUTUxFbGVtZW50PiBldmVudC50YXJnZXQpLnBhcmVudEVsZW1lbnQsICdwLWRpYWxvZy1oZWFkZXItaWNvbicpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZXZlbnQucGFnZVk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3AtdW5zZWxlY3RhYmxlLXRleHQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5mb2N1c1RyYXApIHtcbiAgICAgICAgICAgIGlmIChldmVudC53aGljaCA9PT0gOSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHMgPSBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGVFbGVtZW50cyAmJiBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZm9jdXNhYmxlRWxlbWVudHNbMF0ub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzZWRJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4T2YoZm9jdXNhYmxlRWxlbWVudHNbMF0ub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PSAtMSB8fCBmb2N1c2VkSW5kZXggPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PSAtMSB8fCBmb2N1c2VkSW5kZXggPT09IChmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzZWRJbmRleCArIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyYWcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGxldCBjb250YWluZXJXaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgZGVsdGFYID0gZXZlbnQucGFnZVggLSB0aGlzLmxhc3RQYWdlWDtcbiAgICAgICAgICAgIGxldCBkZWx0YVkgPSBldmVudC5wYWdlWSAtIHRoaXMubGFzdFBhZ2VZO1xuICAgICAgICAgICAgbGV0IG9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGxldCBsZWZ0UG9zID0gb2Zmc2V0LmxlZnQgKyBkZWx0YVg7XG4gICAgICAgICAgICBsZXQgdG9wUG9zID0gb2Zmc2V0LnRvcCArIGRlbHRhWTtcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydCA9IERvbUhhbmRsZXIuZ2V0Vmlld3BvcnQoKTtcblxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwSW5WaWV3cG9ydCkge1xuICAgICAgICAgICAgICAgIGlmIChsZWZ0UG9zID49IHRoaXMubWluWCAmJiAobGVmdFBvcyArIGNvbnRhaW5lcldpZHRoKSA8IHZpZXdwb3J0LndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlLmxlZnQgPSBsZWZ0UG9zICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IGxlZnRQb3MgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0b3BQb3MgPj0gdGhpcy5taW5ZICYmICh0b3BQb3MgKyBjb250YWluZXJIZWlnaHQpIDwgdmlld3BvcnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlLnRvcCA9IHRvcFBvcyArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZXZlbnQucGFnZVk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IHRvcFBvcyArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gbGVmdFBvcyArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSB0b3BQb3MgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5kRHJhZyhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLm9uRHJhZ0VuZC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSAnJztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gJyc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLm1hcmdpbiA9ICcnO1xuICAgIH1cblxuICAgIC8vYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIGNlbnRlcigpIHtcbiAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgaW5pdFJlc2l6ZShldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZXNpemFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXppbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZXZlbnQucGFnZVk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdwLXVuc2VsZWN0YWJsZS10ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLm9uUmVzaXplSW5pdC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6aW5nKSB7XG4gICAgICAgICAgICBsZXQgZGVsdGFYID0gZXZlbnQucGFnZVggLSB0aGlzLmxhc3RQYWdlWDtcbiAgICAgICAgICAgIGxldCBkZWx0YVkgPSBldmVudC5wYWdlWSAtIHRoaXMubGFzdFBhZ2VZO1xuICAgICAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGxldCBjb250YWluZXJIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGxldCBjb250ZW50SGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgbmV3V2lkdGggPSBjb250YWluZXJXaWR0aCArIGRlbHRhWDtcbiAgICAgICAgICAgIGxldCBuZXdIZWlnaHQgPSBjb250YWluZXJIZWlnaHQgKyBkZWx0YVk7XG4gICAgICAgICAgICBsZXQgbWluV2lkdGggPSB0aGlzLmNvbnRhaW5lci5zdHlsZS5taW5XaWR0aDtcbiAgICAgICAgICAgIGxldCBtaW5IZWlnaHQgPSB0aGlzLmNvbnRhaW5lci5zdHlsZS5taW5IZWlnaHQ7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgbGV0IHZpZXdwb3J0ID0gRG9tSGFuZGxlci5nZXRWaWV3cG9ydCgpO1xuICAgICAgICAgICAgbGV0IGhhc0JlZW5EcmFnZ2VkID0gIXBhcnNlSW50KHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCkgfHwgIXBhcnNlSW50KHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQpO1xuXG4gICAgICAgICAgICBpZiAoaGFzQmVlbkRyYWdnZWQpIHtcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCArPSBkZWx0YVg7XG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ICs9IGRlbHRhWTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCghbWluV2lkdGggfHwgbmV3V2lkdGggPiBwYXJzZUludChtaW5XaWR0aCkpICYmIChvZmZzZXQubGVmdCArIG5ld1dpZHRoKSA8IHZpZXdwb3J0LndpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUud2lkdGggPSBuZXdXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGggPSB0aGlzLl9zdHlsZS53aWR0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCghbWluSGVpZ2h0IHx8IG5ld0hlaWdodCA+IHBhcnNlSW50KG1pbkhlaWdodCkpICYmIChvZmZzZXQudG9wICsgbmV3SGVpZ2h0KSA8IHZpZXdwb3J0LmhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IGNvbnRlbnRIZWlnaHQgKyBuZXdIZWlnaHQgLSBjb250YWluZXJIZWlnaHQgKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0eWxlLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZS5oZWlnaHQgPSBuZXdIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9zdHlsZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZUVuZChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZXNpemluZykge1xuICAgICAgICAgICAgdGhpcy5yZXNpemluZyA9IGZhbHNlO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZUVuZC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRHbG9iYWxMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnREcmFnTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RHJhZ0VuZExpc3RlbmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXNpemFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jbG9zZU9uRXNjYXBlICYmIHRoaXMuY2xvc2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudERyYWdMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RHJhZ0VuZExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50RHJhZ0xpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lciA9IHRoaXMub25EcmFnLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50RHJhZ0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jdW1lbnREcmFnTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnREcmFnRW5kTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RHJhZ0VuZExpc3RlbmVyID0gdGhpcy5lbmREcmFnLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudERyYWdFbmRMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2N1bWVudERyYWdFbmRMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RHJhZ0VuZExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMub25SZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lciA9IHRoaXMucmVzaXplRW5kLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgJiYgdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKSB7XG4gICAgICAgIGNvbnN0IGRvY3VtZW50VGFyZ2V0OiBhbnkgPSB0aGlzLmVsID8gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQgOiAnZG9jdW1lbnQnO1xuXG4gICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09IDI3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZShldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZENvbnRhaW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyID0gdGhpcy5jb250YWluZXIucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZENvbnRhaW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZU9uVG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc2V0QXR0cmlidXRlKHRoaXMuaWQsICcnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kYWwgJiYgdGhpcy5ibG9ja1Njcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzT25TaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KHt9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdCh7fSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29udGFpbmVyRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubWFza1Zpc2libGUgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5tYXhpbWl6ZWQpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLm1heGltaXplZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ibG9ja1Njcm9sbCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy53cmFwcGVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zdHlsZSA9IHRoaXMub3JpZ2luYWxTdHlsZSA/IHsuLi50aGlzLm9yaWdpbmFsU3R5bGV9IDoge307XG4gICAgfVxuXG4gICAgZGVzdHJveVN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5zdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQodGhpcy5zdHlsZUVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5yZXN0b3JlQXBwZW5kKCk7XG4gICAgICAgICAgICB0aGlzLm9uQ29udGFpbmVyRGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXN0cm95U3R5bGUoKTtcbiAgICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEZvY3VzVHJhcE1vZHVsZSxSaXBwbGVNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtEaWFsb2csU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEaWFsb2ddXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ01vZHVsZSB7IH1cbiJdfQ==