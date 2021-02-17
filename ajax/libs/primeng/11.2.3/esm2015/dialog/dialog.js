import { NgModule, Component, ElementRef, Input, Output, EventEmitter, Renderer2, ContentChildren, ViewChild, NgZone, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, ContentChild } from '@angular/core';
import { trigger, style, transition, animate, animation, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Header, Footer, SharedModule, PrimeTemplate } from 'primeng/api';
import { FocusTrapModule } from 'primeng/focustrap';
import { RippleModule } from 'primeng/ripple';
let idx = 0;
const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}')
]);
const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);
export class Dialog {
    constructor(el, renderer, zone, cd) {
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.cd = cd;
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
        this.id = `p-dialog-${idx++}`;
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
        console.log("Breakpoint property is not utilized and deprecated, use CSS media queries instead.");
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
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
            this.wrapper.style.zIndex = String(this.baseZIndex + (DomHandler.zindex - 1));
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
        this.container = null;
        this.wrapper = null;
        this._style = this.originalStyle ? Object.assign({}, this.originalStyle) : {};
    }
    ngOnDestroy() {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    }
}
Dialog.decorators = [
    { type: Component, args: [{
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
                    <span [attr.id]="id + '-label'" class="p-dialog-title" *ngIf="header">{{header}}</span>
                    <span [attr.id]="id + '-label'" class="p-dialog-title" *ngIf="headerFacet">
                        <ng-content select="p-header"></ng-content>
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="maximizable" type="button" [ngClass]="{'p-dialog-header-icon p-dialog-header-maximize p-link':true}" (click)="maximize()" (keydown.enter)="maximize()" tabindex="-1" pRipple>
                            <span class="p-dialog-header-maximize-icon" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                        </button>
                        <button *ngIf="closable" type="button" [ngClass]="{'p-dialog-header-icon p-dialog-header-close p-link':true}" (click)="close($event)" (keydown.enter)="close($event)" tabindex="-1" pRipple>
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
                styles: [".p-dialog-mask{align-items:center;background-color:transparent;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition-property:background-color;width:100%}.p-dialog,.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{display:flex;flex-direction:column;max-height:90%;position:relative;transform:scale(1)}.p-dialog-content{overflow-y:auto}.p-dialog-header{align-items:center;display:flex;flex-shrink:0;justify-content:space-between}.p-dialog-footer{flex-shrink:0}.p-dialog .p-dialog-header-icons{align-items:center;display:flex}.p-dialog .p-dialog-header-icon{align-items:center;display:flex;justify-content:center;overflow:hidden;position:relative}.p-dialog-mask.p-dialog-mask-leave{background-color:transparent}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-top .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{height:100%;left:0!important;max-height:100%;top:0!important;transform:none;transition:none;width:100vw!important}.p-dialog-maximized .p-dialog-content{flex-grow:1}.p-dialog-left{justify-content:flex-start}.p-dialog-right{justify-content:flex-end}.p-dialog-top,.p-dialog-top-left{align-items:flex-start}.p-dialog-top-left{justify-content:flex-start}.p-dialog-top-right{align-items:flex-start;justify-content:flex-end}.p-dialog-bottom{align-items:flex-end}.p-dialog-bottom-left{align-items:flex-end;justify-content:flex-start}.p-dialog-bottom-right{align-items:flex-end;justify-content:flex-end}.p-dialog .p-resizable-handle{bottom:1px;cursor:se-resize;display:block;font-size:.1px;height:12px;position:absolute;right:1px;width:12px}.p-confirm-dialog .p-dialog-content{align-items:center;display:flex}"]
            },] }
];
Dialog.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
Dialog.propDecorators = {
    header: [{ type: Input }],
    draggable: [{ type: Input }],
    resizable: [{ type: Input }],
    positionLeft: [{ type: Input }],
    positionTop: [{ type: Input }],
    contentStyle: [{ type: Input }],
    contentStyleClass: [{ type: Input }],
    modal: [{ type: Input }],
    closeOnEscape: [{ type: Input }],
    dismissableMask: [{ type: Input }],
    rtl: [{ type: Input }],
    closable: [{ type: Input }],
    responsive: [{ type: Input }],
    appendTo: [{ type: Input }],
    styleClass: [{ type: Input }],
    maskStyleClass: [{ type: Input }],
    showHeader: [{ type: Input }],
    breakpoint: [{ type: Input }],
    blockScroll: [{ type: Input }],
    autoZIndex: [{ type: Input }],
    baseZIndex: [{ type: Input }],
    minX: [{ type: Input }],
    minY: [{ type: Input }],
    focusOnShow: [{ type: Input }],
    maximizable: [{ type: Input }],
    keepInViewport: [{ type: Input }],
    focusTrap: [{ type: Input }],
    transitionOptions: [{ type: Input }],
    closeIcon: [{ type: Input }],
    minimizeIcon: [{ type: Input }],
    maximizeIcon: [{ type: Input }],
    headerFacet: [{ type: ContentChild, args: [Header,] }],
    footerFacet: [{ type: ContentChild, args: [Footer,] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    headerViewChild: [{ type: ViewChild, args: ['titlebar',] }],
    contentViewChild: [{ type: ViewChild, args: ['content',] }],
    footerViewChild: [{ type: ViewChild, args: ['footer',] }],
    onShow: [{ type: Output }],
    onHide: [{ type: Output }],
    visibleChange: [{ type: Output }],
    onResizeInit: [{ type: Output }],
    onResizeEnd: [{ type: Output }],
    onDragEnd: [{ type: Output }],
    onMaximize: [{ type: Output }],
    visible: [{ type: Input }],
    style: [{ type: Input }],
    position: [{ type: Input }]
};
export class DialogModule {
}
DialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FocusTrapModule, RippleModule],
                exports: [Dialog, SharedModule],
                declarations: [Dialog]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFXLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFDL0UsZUFBZSxFQUFXLFNBQVMsRUFBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQVMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQWlDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4TCxPQUFPLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFrQixTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDOUcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFFLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN0RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLElBQUksR0FBRyxHQUFXLENBQUMsQ0FBQztBQUVwQixNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDNUIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDakQsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0NBQzVCLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUM1QixPQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVB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QyxNQUFNLENBQUM7YUFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uRGVzdHJveSxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLFJlbmRlcmVyMixcbiAgICBDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFZpZXdDaGlsZCxOZ1pvbmUsIENoYW5nZURldGVjdG9yUmVmLFZpZXdSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBBZnRlckNvbnRlbnRJbml0LCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHJpZ2dlcixzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBhbmltYXRpb24sIHVzZUFuaW1hdGlvbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHtIZWFkZXIsRm9vdGVyLFNoYXJlZE1vZHVsZSwgUHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtGb2N1c1RyYXBNb2R1bGV9IGZyb20gJ3ByaW1lbmcvZm9jdXN0cmFwJztcbmltcG9ydCB7UmlwcGxlTW9kdWxlfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5cbmxldCBpZHg6IG51bWJlciA9IDA7XG5cbmNvbnN0IHNob3dBbmltYXRpb24gPSBhbmltYXRpb24oW1xuICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAne3t0cmFuc2Zvcm19fScsIG9wYWNpdHk6IDAgfSksXG4gICAgYW5pbWF0ZSgne3t0cmFuc2l0aW9ufX0nKVxuXSk7XG5cbmNvbnN0IGhpZGVBbmltYXRpb24gPSBhbmltYXRpb24oW1xuICAgIGFuaW1hdGUoJ3t7dHJhbnNpdGlvbn19Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybX19Jywgb3BhY2l0eTogMCB9KSlcbl0pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWFza1Zpc2libGVcIiBbY2xhc3NdPVwibWFza1N0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLWRpYWxvZy1tYXNrJzogdHJ1ZSwgJ3AtY29tcG9uZW50LW92ZXJsYXknOiB0aGlzLm1vZGFsLCAncC1kaWFsb2ctbWFzay1zY3JvbGxibG9ja2VyJzogdGhpcy5tb2RhbCB8fCB0aGlzLmJsb2NrU2Nyb2xsLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy1sZWZ0JzogcG9zaXRpb24gPT09ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctcmlnaHQnOiBwb3NpdGlvbiA9PT0gJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctdG9wJzogcG9zaXRpb24gPT09ICd0b3AnLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy10b3AtbGVmdCc6IHBvc2l0aW9uID09PSAndG9wbGVmdCcgfHwgcG9zaXRpb24gPT09ICd0b3AtbGVmdCcsXG4gICAgICAgICAgICAgICAgJ3AtZGlhbG9nLXRvcC1yaWdodCc6IHBvc2l0aW9uID09PSAndG9wcmlnaHQnIHx8IHBvc2l0aW9uID09PSAndG9wLXJpZ2h0JyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctYm90dG9tJzogcG9zaXRpb24gPT09ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy1ib3R0b20tbGVmdCc6IHBvc2l0aW9uID09PSAnYm90dG9tbGVmdCcgfHwgcG9zaXRpb24gPT09ICdib3R0b20tbGVmdCcsXG4gICAgICAgICAgICAgICAgJ3AtZGlhbG9nLWJvdHRvbS1yaWdodCc6IHBvc2l0aW9uID09PSAnYm90dG9tcmlnaHQnIHx8IHBvc2l0aW9uID09PSAnYm90dG9tLXJpZ2h0J31cIj5cbiAgICAgICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJ7J3AtZGlhbG9nIHAtY29tcG9uZW50Jzp0cnVlLCAncC1kaWFsb2ctcnRsJzpydGwsJ3AtZGlhbG9nLWRyYWdnYWJsZSc6ZHJhZ2dhYmxlLCdwLWRpYWxvZy1yZXNpemFibGUnOnJlc2l6YWJsZSwgJ3AtZGlhbG9nLW1heGltaXplZCc6IG1heGltaXplZH1cIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cInZpc2libGVcIiBwRm9jdXNUcmFwIFtwRm9jdXNUcmFwRGlzYWJsZWRdPVwiZm9jdXNUcmFwID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgW0BhbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3RyYW5zZm9ybTogdHJhbnNmb3JtT3B0aW9ucywgdHJhbnNpdGlvbjogdHJhbnNpdGlvbk9wdGlvbnN9fVwiIChAYW5pbWF0aW9uLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIChAYW5pbWF0aW9uLmRvbmUpPVwib25BbmltYXRpb25FbmQoJGV2ZW50KVwiIHJvbGU9XCJkaWFsb2dcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaWQgKyAnLWxhYmVsJ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgI3RpdGxlYmFyIGNsYXNzPVwicC1kaWFsb2ctaGVhZGVyXCIgKG1vdXNlZG93bik9XCJpbml0RHJhZygkZXZlbnQpXCIgKm5nSWY9XCJzaG93SGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFthdHRyLmlkXT1cImlkICsgJy1sYWJlbCdcIiBjbGFzcz1cInAtZGlhbG9nLXRpdGxlXCIgKm5nSWY9XCJoZWFkZXJcIj57e2hlYWRlcn19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbYXR0ci5pZF09XCJpZCArICctbGFiZWwnXCIgY2xhc3M9XCJwLWRpYWxvZy10aXRsZVwiICpuZ0lmPVwiaGVhZGVyRmFjZXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kaWFsb2ctaGVhZGVyLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwibWF4aW1pemFibGVcIiB0eXBlPVwiYnV0dG9uXCIgW25nQ2xhc3NdPVwieydwLWRpYWxvZy1oZWFkZXItaWNvbiBwLWRpYWxvZy1oZWFkZXItbWF4aW1pemUgcC1saW5rJzp0cnVlfVwiIChjbGljayk9XCJtYXhpbWl6ZSgpXCIgKGtleWRvd24uZW50ZXIpPVwibWF4aW1pemUoKVwiIHRhYmluZGV4PVwiLTFcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1kaWFsb2ctaGVhZGVyLW1heGltaXplLWljb25cIiBbbmdDbGFzc109XCJtYXhpbWl6ZWQgPyBtaW5pbWl6ZUljb24gOiBtYXhpbWl6ZUljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJjbG9zYWJsZVwiIHR5cGU9XCJidXR0b25cIiBbbmdDbGFzc109XCJ7J3AtZGlhbG9nLWhlYWRlci1pY29uIHAtZGlhbG9nLWhlYWRlci1jbG9zZSBwLWxpbmsnOnRydWV9XCIgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJjbG9zZSgkZXZlbnQpXCIgdGFiaW5kZXg9XCItMVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWRpYWxvZy1oZWFkZXItY2xvc2UtaWNvblwiIFtuZ0NsYXNzXT1cImNsb3NlSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNjb250ZW50IFtuZ0NsYXNzXT1cIidwLWRpYWxvZy1jb250ZW50J1wiIFtuZ1N0eWxlXT1cImNvbnRlbnRTdHlsZVwiIFtjbGFzc109XCJjb250ZW50U3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNmb290ZXIgY2xhc3M9XCJwLWRpYWxvZy1mb290ZXJcIiAqbmdJZj1cImZvb3RlckZhY2V0IHx8IGZvb3RlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicmVzaXphYmxlXCIgY2xhc3M9XCJwLXJlc2l6YWJsZS1oYW5kbGVcIiBzdHlsZT1cInotaW5kZXg6IDkwO1wiIChtb3VzZWRvd24pPVwiaW5pdFJlc2l6ZSgkZXZlbnQpXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2FuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIFtcbiAgICAgICAgICAgICAgICB1c2VBbmltYXRpb24oc2hvd0FuaW1hdGlvbilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgW1xuICAgICAgICAgICAgICAgIHVzZUFuaW1hdGlvbihoaWRlQW5pbWF0aW9uKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi4vZGlhbG9nL2RpYWxvZy5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2cgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRyYWdnYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSByZXNpemFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZ2V0IHBvc2l0aW9uTGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuXG4gICAgc2V0IHBvc2l0aW9uTGVmdChfcG9zaXRpb25MZWZ0OiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJwb3NpdGlvbkxlZnQgcHJvcGVydHkgaXMgZGVwcmVjYXRlZC5cIik7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHBvc2l0aW9uVG9wKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG5cbiAgICBzZXQgcG9zaXRpb25Ub3AoX3Bvc2l0aW9uVG9wOiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJwb3NpdGlvblRvcCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLlwiKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBjb250ZW50U3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBtb2RhbDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNsb3NlT25Fc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZGlzbWlzc2FibGVNYXNrOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcnRsOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgY2xvc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZ2V0IHJlc3BvbnNpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgc2V0IHJlc3BvbnNpdmUoX3Jlc3BvbnNpdmU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zaXZlIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuXCIpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBtYXNrU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2hvd0hlYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBnZXQgYnJlYWtwb2ludCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gNjQ5O1xuICAgIH07XG5cbiAgICBzZXQgYnJlYWtwb2ludChfYnJlYWtwb2ludDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBwcm9wZXJ0eSBpcyBub3QgdXRpbGl6ZWQgYW5kIGRlcHJlY2F0ZWQsIHVzZSBDU1MgbWVkaWEgcXVlcmllcyBpbnN0ZWFkLlwiKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBibG9ja1Njcm9sbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgbWluWDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIG1pblk6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBmb2N1c09uU2hvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBtYXhpbWl6YWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGtlZXBJblZpZXdwb3J0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGZvY3VzVHJhcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzE1MG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcblxuICAgIEBJbnB1dCgpIGNsb3NlSWNvbjogc3RyaW5nID0gJ3BpIHBpLXRpbWVzJztcblxuICAgIEBJbnB1dCgpIG1pbmltaXplSWNvbjogc3RyaW5nID0gJ3BpIHBpLXdpbmRvdy1taW5pbWl6ZSc7XG5cbiAgICBASW5wdXQoKSBtYXhpbWl6ZUljb246IHN0cmluZyA9ICdwaSBwaS13aW5kb3ctbWF4aW1pemUnO1xuXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIpIGhlYWRlckZhY2V0OiBRdWVyeUxpc3Q8SGVhZGVyPjtcblxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXJGYWNldDogUXVlcnlMaXN0PEZvb3Rlcj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBAVmlld0NoaWxkKCd0aXRsZWJhcicpIGhlYWRlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnZm9vdGVyJykgZm9vdGVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSB2aXNpYmxlQ2hhbmdlOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uUmVzaXplSW5pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25SZXNpemVFbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRHJhZ0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25NYXhpbWl6ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgX3Zpc2libGU6IGJvb2xlYW47XG5cbiAgICBtYXNrVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICB3cmFwcGVyOiBIVE1MRWxlbWVudDtcblxuICAgIGRyYWdnaW5nOiBib29sZWFuO1xuXG4gICAgZG9jdW1lbnREcmFnTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50RHJhZ0VuZExpc3RlbmVyOiBhbnk7XG5cbiAgICByZXNpemluZzogYm9vbGVhbjtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50RXNjYXBlTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgbWFza0NsaWNrTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgbGFzdFBhZ2VYOiBudW1iZXI7XG5cbiAgICBsYXN0UGFnZVk6IG51bWJlcjtcblxuICAgIHByZXZlbnRWaXNpYmxlQ2hhbmdlUHJvcGFnYXRpb246IGJvb2xlYW47XG5cbiAgICBtYXhpbWl6ZWQ6IGJvb2xlYW47XG5cbiAgICBwcmVNYXhpbWl6ZUNvbnRlbnRIZWlnaHQ6IG51bWJlcjtcblxuICAgIHByZU1heGltaXplQ29udGFpbmVyV2lkdGg6IG51bWJlcjtcblxuICAgIHByZU1heGltaXplQ29udGFpbmVySGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwcmVNYXhpbWl6ZVBhZ2VYOiBudW1iZXI7XG5cbiAgICBwcmVNYXhpbWl6ZVBhZ2VZOiBudW1iZXI7XG5cbiAgICBpZDogc3RyaW5nID0gYHAtZGlhbG9nLSR7aWR4Kyt9YDtcblxuICAgIF9zdHlsZTogYW55ID0ge307XG5cbiAgICBfcG9zaXRpb246IHN0cmluZyA9IFwiY2VudGVyXCI7XG5cbiAgICBvcmlnaW5hbFN0eWxlOiBhbnk7XG5cbiAgICB0cmFuc2Zvcm1PcHRpb25zOiBhbnkgPSBcInNjYWxlKDAuNylcIjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCB2aXNpYmxlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cbiAgICBzZXQgdmlzaWJsZSh2YWx1ZTphbnkpIHtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlICYmICF0aGlzLm1hc2tWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzdHlsZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU7XG4gICAgfVxuICAgIHNldCBzdHlsZSh2YWx1ZTphbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IHsuLi52YWx1ZX07XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsU3R5bGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBwb3NpdGlvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gICAgfTtcblxuICAgIHNldCBwb3NpdGlvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XG5cbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAndG9wbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdib3R0b21sZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9IFwidHJhbnNsYXRlM2QoLTEwMCUsIDBweCwgMHB4KVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3ByaWdodCc6XG4gICAgICAgICAgICBjYXNlICdib3R0b21yaWdodCc6XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gXCJ0cmFuc2xhdGUzZCgxMDAlLCAwcHgsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKDBweCwgMTAwJSwgMHB4KVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9IFwidHJhbnNsYXRlM2QoMHB4LCAtMTAwJSwgMHB4KVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9IFwic2NhbGUoMC43KVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgbGV0IGZvY3VzYWJsZSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRhaW5lciwgJ1thdXRvZm9jdXNdJyk7XG4gICAgICAgIGlmIChmb2N1c2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBmb2N1c2FibGUuZm9jdXMoKSwgNSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZW5hYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NhYmxlICYmIHRoaXMuZGlzbWlzc2FibGVNYXNrKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy53cmFwcGVyLCAnbW91c2Vkb3duJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53cmFwcGVyICYmIHRoaXMud3JhcHBlci5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZShldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVNb2RhbGl0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMud3JhcHBlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlzbWlzc2FibGVNYXNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXhpbWl6ZSgpIHtcbiAgICAgICAgdGhpcy5tYXhpbWl6ZWQgPSAhdGhpcy5tYXhpbWl6ZWQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLm1vZGFsICYmICF0aGlzLmJsb2NrU2Nyb2xsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhpbWl6ZWQpXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbk1heGltaXplLmVtaXQoeydtYXhpbWl6ZWQnOiB0aGlzLm1heGltaXplZH0pO1xuICAgIH1cblxuICAgIHVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5tYXNrQ2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tYXNrQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5tYXNrQ2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlT25Ub3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoRG9tSGFuZGxlci56aW5kZXggLSAxKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RHJhZyhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwLWRpYWxvZy1oZWFkZXItaWNvbicpIHx8wqBEb21IYW5kbGVyLmhhc0NsYXNzKCg8SFRNTEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkucGFyZW50RWxlbWVudCwgJ3AtZGlhbG9nLWhlYWRlci1pY29uJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcblxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubWFyZ2luID0gJzAnO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzVHJhcCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSA5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50cyA9IERvbUhhbmRsZXIuZ2V0Rm9jdXNhYmxlRWxlbWVudHModGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzICYmIGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmb2N1c2FibGVFbGVtZW50c1swXS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNlZEluZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMuaW5kZXhPZihmb2N1c2FibGVFbGVtZW50c1swXS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzZWRJbmRleCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gKGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNlZEluZGV4ICsgMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZyhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGxldCBjb250YWluZXJIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGxldCBkZWx0YVggPSBldmVudC5wYWdlWCAtIHRoaXMubGFzdFBhZ2VYO1xuICAgICAgICAgICAgbGV0IGRlbHRhWSA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5sYXN0UGFnZVk7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgbGV0IGxlZnRQb3MgPSBvZmZzZXQubGVmdCArIGRlbHRhWDtcbiAgICAgICAgICAgIGxldCB0b3BQb3MgPSBvZmZzZXQudG9wICsgZGVsdGFZO1xuICAgICAgICAgICAgbGV0IHZpZXdwb3J0ID0gRG9tSGFuZGxlci5nZXRWaWV3cG9ydCgpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmtlZXBJblZpZXdwb3J0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnRQb3MgPj0gdGhpcy5taW5YICYmIChsZWZ0UG9zICsgY29udGFpbmVyV2lkdGgpIDwgdmlld3BvcnQud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUubGVmdCA9IGxlZnRQb3MgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gbGVmdFBvcyArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRvcFBvcyA+PSB0aGlzLm1pblkgJiYgKHRvcFBvcyArIGNvbnRhaW5lckhlaWdodCkgPCB2aWV3cG9ydC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUudG9wID0gdG9wUG9zICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gdG9wUG9zICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0UG9zICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IHRvcFBvcyArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmREcmFnKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdwLXVuc2VsZWN0YWJsZS10ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIHRoaXMub25EcmFnRW5kLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9ICcnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSAnJztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubWFyZ2luID0gJyc7XG4gICAgfVxuXG4gICAgLy9iYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgY2VudGVyKCkge1xuICAgICAgICB0aGlzLnJlc2V0UG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBpbml0UmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3AtdW5zZWxlY3RhYmxlLXRleHQnKTtcbiAgICAgICAgICAgIHRoaXMub25SZXNpemVJbml0LmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25SZXNpemUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXppbmcpIHtcbiAgICAgICAgICAgIGxldCBkZWx0YVggPSBldmVudC5wYWdlWCAtIHRoaXMubGFzdFBhZ2VYO1xuICAgICAgICAgICAgbGV0IGRlbHRhWSA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5sYXN0UGFnZVk7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgbGV0IGNvbnRlbnRIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGxldCBuZXdXaWR0aCA9IGNvbnRhaW5lcldpZHRoICsgZGVsdGFYO1xuICAgICAgICAgICAgbGV0IG5ld0hlaWdodCA9IGNvbnRhaW5lckhlaWdodCArIGRlbHRhWTtcbiAgICAgICAgICAgIGxldCBtaW5XaWR0aCA9IHRoaXMuY29udGFpbmVyLnN0eWxlLm1pbldpZHRoO1xuICAgICAgICAgICAgbGV0IG1pbkhlaWdodCA9IHRoaXMuY29udGFpbmVyLnN0eWxlLm1pbkhlaWdodDtcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgdmlld3BvcnQgPSBEb21IYW5kbGVyLmdldFZpZXdwb3J0KCk7XG4gICAgICAgICAgICBsZXQgaGFzQmVlbkRyYWdnZWQgPSAhcGFyc2VJbnQodGhpcy5jb250YWluZXIuc3R5bGUudG9wKSB8fCAhcGFyc2VJbnQodGhpcy5jb250YWluZXIuc3R5bGUubGVmdCk7XG5cbiAgICAgICAgICAgIGlmIChoYXNCZWVuRHJhZ2dlZCkge1xuICAgICAgICAgICAgICAgIG5ld1dpZHRoICs9IGRlbHRhWDtcbiAgICAgICAgICAgICAgICBuZXdIZWlnaHQgKz0gZGVsdGFZO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKCFtaW5XaWR0aCB8fCBuZXdXaWR0aCA+IHBhcnNlSW50KG1pbldpZHRoKSkgJiYgKG9mZnNldC5sZWZ0ICsgbmV3V2lkdGgpIDwgdmlld3BvcnQud2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZS53aWR0aCA9IG5ld1dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHRoaXMuX3N0eWxlLndpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKCFtaW5IZWlnaHQgfHwgbmV3SGVpZ2h0ID4gcGFyc2VJbnQobWluSGVpZ2h0KSkgJiYgKG9mZnNldC50b3AgKyBuZXdIZWlnaHQpIDwgdmlld3BvcnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gY29udGVudEhlaWdodCArIG5ld0hlaWdodCAtIGNvbnRhaW5lckhlaWdodCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3R5bGUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX3N0eWxlLmhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzaXplRW5kKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdwLXVuc2VsZWN0YWJsZS10ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLm9uUmVzaXplRW5kLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudERyYWdMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnREcmFnRW5kTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2l6YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25Fc2NhcGUgJiYgdGhpcy5jbG9zYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kR2xvYmFsTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RHJhZ0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnREcmFnRW5kTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVycygpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnREcmFnTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RHJhZ0xpc3RlbmVyID0gdGhpcy5vbkRyYWcuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50RHJhZ0xpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnREcmFnTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50RHJhZ0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RHJhZ0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudERyYWdFbmRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIgPSB0aGlzLmVuZERyYWcuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2N1bWVudERyYWdFbmRMaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50RHJhZ0VuZExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudERyYWdFbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50RHJhZ0VuZExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyID0gdGhpcy5yZXNpemVFbmQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciAmJiB0aGlzLmRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6ICdkb2N1bWVudCc7XG5cbiAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMjcpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5jb250YWluZXIuc3R5bGUuekluZGV4KSA9PT0gKERvbUhhbmRsZXIuemluZGV4ICsgdGhpcy5iYXNlWkluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZENvbnRhaW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyID0gdGhpcy5jb250YWluZXIucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZENvbnRhaW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZU9uVG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGFsICYmIHRoaXMuYmxvY2tTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c09uU2hvdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Db250YWluZXJEZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZGUuZW1pdCh7fSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25TaG93LmVtaXQoe30pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm1hc2tWaXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMubWF4aW1pemVkKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5tYXhpbWl6ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYmxvY2tTY3JvbGwpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIHRoaXMud3JhcHBlciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fc3R5bGUgPSB0aGlzLm9yaWdpbmFsU3R5bGUgPyB7Li4udGhpcy5vcmlnaW5hbFN0eWxlfSA6IHt9O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZUFwcGVuZCgpO1xuICAgICAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsRm9jdXNUcmFwTW9kdWxlLFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW0RpYWxvZyxTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0RpYWxvZ11cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nTW9kdWxlIHsgfVxuIl19