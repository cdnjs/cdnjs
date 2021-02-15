import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, ChangeDetectorRef, Input, ViewChild, ContentChildren, Output, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';

class Sidebar {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.position = 'left';
        this.blockScroll = false;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.modal = true;
        this.dismissible = true;
        this.showCloseIcon = true;
        this.closeOnEscape = true;
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.visibleChange = new EventEmitter();
    }
    ngAfterViewInit() {
        this.initialized = true;
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
        if (this.visible) {
            this.show();
        }
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
        if (this.initialized && this.containerViewChild && this.containerViewChild.nativeElement) {
            if (this._visible)
                this.show();
            else {
                if (this.preventVisibleChangePropagation)
                    this.preventVisibleChangePropagation = false;
                else
                    this.hide();
            }
        }
    }
    ngAfterViewChecked() {
        if (this.executePostDisplayActions) {
            this.onShow.emit({});
            this.executePostDisplayActions = false;
        }
    }
    show() {
        this.executePostDisplayActions = true;
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
        if (this.modal) {
            this.enableModality();
        }
    }
    hide() {
        this.onHide.emit({});
        if (this.modal) {
            this.disableModality();
        }
    }
    close(event) {
        this.preventVisibleChangePropagation = true;
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
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
                if (this.closeOnEscape) {
                    this.bindDocumentEscapeListener();
                }
                break;
            case 'hidden':
                this.unbindGlobalListeners();
                break;
        }
    }
    bindDocumentEscapeListener() {
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.containerViewChild.nativeElement.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
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
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
        this.unbindGlobalListeners();
    }
}
Sidebar.decorators = [
    { type: Component, args: [{
                selector: 'p-sidebar',
                template: `
        <div #container [ngClass]="{'p-sidebar':true, 'p-sidebar-active': visible,
            'p-sidebar-left': (position === 'left'), 'p-sidebar-right': (position === 'right'),
            'p-sidebar-top': (position === 'top'), 'p-sidebar-bottom': (position === 'bottom'),
            'p-sidebar-full': fullScreen}"
            [@panelState]="visible ? 'visible' : 'hidden'" (@panelState.start)="onAnimationStart($event)" [ngStyle]="style" [class]="styleClass"  role="complementary" [attr.aria-modal]="modal">
            <div class="p-sidebar-content">
                <button type="button" class="p-sidebar-close p-link" *ngIf="showCloseIcon" (click)="close($event)" (keydown.enter)="close($event)" [attr.aria-label]="ariaCloseLabel" pRipple>
                    <span class="p-sidebar-close-icon pi pi-times"></span>
                </button>
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
        </div>
    `,
                animations: [
                    trigger('panelState', [
                        state('hidden', style({
                            opacity: 0
                        })),
                        state('visible', style({
                            opacity: 1
                        })),
                        transition('visible => hidden', animate('300ms ease-in')),
                        transition('hidden => visible', animate('300ms ease-out'))
                    ])
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-sidebar{position:fixed;transition:transform .3s}.p-sidebar-content{position:relative}.p-sidebar-close{align-items:center;display:flex;justify-content:center;overflow:hidden;position:absolute;right:0;top:0}.p-sidebar-mask{transition-property:background-color}.p-sidebar-mask,.p-sidebar-mask-leave.p-component-overlay{background-color:transparent}.p-sidebar-left{height:100%;left:0;top:0;transform:translateX(-100%);width:20rem}.p-sidebar-left.p-sidebar-active{transform:translateX(0)}.p-sidebar-right{height:100%;right:0;top:0;transform:translateX(100%);width:20rem}.p-sidebar-right.p-sidebar-active{transform:translateX(0)}.p-sidebar-top{height:10rem;left:0;top:0;transform:translateY(-100%);width:100%}.p-sidebar-top.p-sidebar-active{transform:translateY(0)}.p-sidebar-bottom{bottom:0;height:10rem;left:0;transform:translateY(100%);width:100%}.p-sidebar-bottom.p-sidebar-active{transform:translateY(0)}.p-sidebar-full{height:100%;left:0;top:0;transition:none;width:100%}.p-sidebar-left.p-sidebar-sm,.p-sidebar-right.p-sidebar-sm{width:20rem}.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-md{width:40rem}.p-sidebar-left.p-sidebar-lg,.p-sidebar-right.p-sidebar-lg{width:60rem}.p-sidebar-bottom.p-sidebar-sm,.p-sidebar-top.p-sidebar-sm{height:10rem}.p-sidebar-bottom.p-sidebar-md,.p-sidebar-top.p-sidebar-md{height:20rem}.p-sidebar-bottom.p-sidebar-lg,.p-sidebar-top.p-sidebar-lg{height:30rem}@media screen and (max-width:64em){.p-sidebar-left.p-sidebar-lg,.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-lg,.p-sidebar-right.p-sidebar-md{width:20rem}}"]
            },] }
];
Sidebar.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
Sidebar.propDecorators = {
    position: [{ type: Input }],
    fullScreen: [{ type: Input }],
    appendTo: [{ type: Input }],
    blockScroll: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    ariaCloseLabel: [{ type: Input }],
    autoZIndex: [{ type: Input }],
    baseZIndex: [{ type: Input }],
    modal: [{ type: Input }],
    dismissible: [{ type: Input }],
    showCloseIcon: [{ type: Input }],
    closeOnEscape: [{ type: Input }],
    containerViewChild: [{ type: ViewChild, args: ['container',] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    onShow: [{ type: Output }],
    onHide: [{ type: Output }],
    visibleChange: [{ type: Output }],
    visible: [{ type: Input }]
};
class SidebarModule {
}
SidebarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, RippleModule],
                exports: [Sidebar],
                declarations: [Sidebar]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Sidebar, SidebarModule };
//# sourceMappingURL=primeng-sidebar.js.map
