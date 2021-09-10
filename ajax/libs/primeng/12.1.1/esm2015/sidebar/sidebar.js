import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { trigger, style, transition, animate, animation, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}')
]);
const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);
export class Sidebar {
    constructor(el, renderer, cd, config) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.config = config;
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
            ZIndexUtils.set('modal', this.container, this.baseZIndex || this.config.zIndex.modal);
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
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(this.container);
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
        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }
        this.container = null;
        this.unbindGlobalListeners();
    }
}
Sidebar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Sidebar, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
Sidebar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Sidebar, selector: "p-sidebar", inputs: { appendTo: "appendTo", blockScroll: "blockScroll", style: "style", styleClass: "styleClass", ariaCloseLabel: "ariaCloseLabel", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", modal: "modal", dismissible: "dismissible", showCloseIcon: "showCloseIcon", closeOnEscape: "closeOnEscape", transitionOptions: "transitionOptions", visible: "visible", position: "position", fullScreen: "fullScreen" }, outputs: { onShow: "onShow", onHide: "onHide", visibleChange: "visibleChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div #container [ngClass]="{'p-sidebar':true, 'p-sidebar-active': visible,
            'p-sidebar-left': (position === 'left' && !fullScreen), 'p-sidebar-right': (position === 'right' && !fullScreen),
            'p-sidebar-top': (position === 'top' && !fullScreen), 'p-sidebar-bottom': (position === 'bottom' && !fullScreen),
            'p-sidebar-full': fullScreen}"  *ngIf="visible" [@panelState]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@panelState.start)="onAnimationStart($event)" (@panelState.done)="onAnimationEnd($event)" [ngStyle]="style" [class]="styleClass"  role="complementary" [attr.aria-modal]="modal">
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
    `, isInline: true, styles: [".p-sidebar{position:fixed;transition:transform .3s;display:flex;flex-direction:column}.p-sidebar-content{position:relative;overflow-y:auto}.p-sidebar-header{display:flex;align-items:center;justify-content:flex-end}.p-sidebar-icon{display:flex;align-items:center;justify-content:center}.p-sidebar-mask{transition-property:background-color}.p-sidebar-mask,.p-sidebar-mask.p-sidebar-mask-leave.p-component-overlay{background-color:transparent}.p-sidebar-left{top:0;left:0;width:20rem;height:100%}.p-sidebar-right{top:0;right:0;width:20rem;height:100%}.p-sidebar-top{top:0;left:0;width:100%;height:10rem}.p-sidebar-bottom{bottom:0;left:0;width:100%;height:10rem}.p-sidebar-full{width:100%;height:100%;top:0;left:0;transition:none}.p-sidebar-left.p-sidebar-sm,.p-sidebar-right.p-sidebar-sm{width:20rem}.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-md{width:40rem}.p-sidebar-left.p-sidebar-lg,.p-sidebar-right.p-sidebar-lg{width:60rem}.p-sidebar-bottom.p-sidebar-sm,.p-sidebar-top.p-sidebar-sm{height:10rem}.p-sidebar-bottom.p-sidebar-md,.p-sidebar-top.p-sidebar-md{height:20rem}.p-sidebar-bottom.p-sidebar-lg,.p-sidebar-top.p-sidebar-lg{height:30rem}@media screen and (max-width:64em){.p-sidebar-left.p-sidebar-lg,.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-lg,.p-sidebar-right.p-sidebar-md{width:20rem}}"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3.Ripple, selector: "[pRipple]" }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
        trigger('panelState', [
            transition('void => visible', [
                useAnimation(showAnimation)
            ]),
            transition('visible => void', [
                useAnimation(hideAnimation)
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Sidebar, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-sidebar',
                    template: `
        <div #container [ngClass]="{'p-sidebar':true, 'p-sidebar-active': visible,
            'p-sidebar-left': (position === 'left' && !fullScreen), 'p-sidebar-right': (position === 'right' && !fullScreen),
            'p-sidebar-top': (position === 'top' && !fullScreen), 'p-sidebar-bottom': (position === 'bottom' && !fullScreen),
            'p-sidebar-full': fullScreen}"  *ngIf="visible" [@panelState]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@panelState.start)="onAnimationStart($event)" (@panelState.done)="onAnimationEnd($event)" [ngStyle]="style" [class]="styleClass"  role="complementary" [attr.aria-modal]="modal">
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
                    styleUrls: ['./sidebar.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }]; }, propDecorators: { appendTo: [{
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
export class SidebarModule {
}
SidebarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SidebarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SidebarModule, declarations: [Sidebar], imports: [CommonModule, RippleModule], exports: [Sidebar] });
SidebarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SidebarModule, imports: [[CommonModule, RippleModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule],
                    exports: [Sidebar],
                    declarations: [Sidebar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQXlCLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFzQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQThELE1BQU0sZUFBZSxDQUFDO0FBQ2pQLE9BQU8sRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQWdCLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN6RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztBQUUxQyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDNUIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDakQsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0NBQzVCLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUM1QixPQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUMvRSxDQUFDLENBQUM7QUFxQ0gsTUFBTSxPQUFPLE9BQU87SUFzRGhCLFlBQW1CLEVBQWMsRUFBUyxRQUFtQixFQUFTLEVBQXFCLEVB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TSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxpQkExUWIsT0FBTyxhQXNRTixZQUFZLEVBQUMsWUFBWSxhQXRRMUIsT0FBTzsyR0EwUVAsYUFBYSxZQUpiLENBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQzsyRkFJM0IsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO29CQUNwQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxBZnRlclZpZXdJbml0LE9uRGVzdHJveSxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLEVsZW1lbnRSZWYsUmVuZGVyZXIyLENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEFmdGVyQ29udGVudEluaXQsIFRlbXBsYXRlUmVmLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3RyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlLCBhbmltYXRpb24sIHVzZUFuaW1hdGlvbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7UmlwcGxlTW9kdWxlfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7UHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtaSW5kZXhVdGlsc30gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbmNvbnN0IHNob3dBbmltYXRpb24gPSBhbmltYXRpb24oW1xuICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAne3t0cmFuc2Zvcm19fScsIG9wYWNpdHk6IDAgfSksXG4gICAgYW5pbWF0ZSgne3t0cmFuc2l0aW9ufX0nKVxuXSk7XG5cbmNvbnN0IGhpZGVBbmltYXRpb24gPSBhbmltYXRpb24oW1xuICAgIGFuaW1hdGUoJ3t7dHJhbnNpdGlvbn19Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybX19Jywgb3BhY2l0eTogMCB9KSlcbl0pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2lkZWJhcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cInsncC1zaWRlYmFyJzp0cnVlLCAncC1zaWRlYmFyLWFjdGl2ZSc6IHZpc2libGUsXG4gICAgICAgICAgICAncC1zaWRlYmFyLWxlZnQnOiAocG9zaXRpb24gPT09ICdsZWZ0JyAmJiAhZnVsbFNjcmVlbiksICdwLXNpZGViYXItcmlnaHQnOiAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgIWZ1bGxTY3JlZW4pLFxuICAgICAgICAgICAgJ3Atc2lkZWJhci10b3AnOiAocG9zaXRpb24gPT09ICd0b3AnICYmICFmdWxsU2NyZWVuKSwgJ3Atc2lkZWJhci1ib3R0b20nOiAocG9zaXRpb24gPT09ICdib3R0b20nICYmICFmdWxsU2NyZWVuKSxcbiAgICAgICAgICAgICdwLXNpZGViYXItZnVsbCc6IGZ1bGxTY3JlZW59XCIgICpuZ0lmPVwidmlzaWJsZVwiIFtAcGFuZWxTdGF0ZV09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7dHJhbnNmb3JtOiB0cmFuc2Zvcm1PcHRpb25zLCB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uT3B0aW9uc319XCIgKEBwYW5lbFN0YXRlLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIChAcGFuZWxTdGF0ZS5kb25lKT1cIm9uQW5pbWF0aW9uRW5kKCRldmVudClcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgIHJvbGU9XCJjb21wbGVtZW50YXJ5XCIgW2F0dHIuYXJpYS1tb2RhbF09XCJtb2RhbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc2lkZWJhci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInAtc2lkZWJhci1jbG9zZSBwLXNpZGViYXItaWNvbiBwLWxpbmtcIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFDbG9zZUxhYmVsXCIgICpuZ0lmPVwic2hvd0Nsb3NlSWNvblwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1zaWRlYmFyLWNsb3NlLWljb24gcGkgcGktdGltZXNcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNpZGViYXItY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3BhbmVsU3RhdGUnLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBbXG4gICAgICAgICAgICAgICAgdXNlQW5pbWF0aW9uKHNob3dBbmltYXRpb24pXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICB1c2VBbmltYXRpb24oaGlkZUFuaW1hdGlvbilcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3NpZGViYXIuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2lkZWJhciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgYmxvY2tTY3JvbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhQ2xvc2VMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgbW9kYWw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZGlzbWlzc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2hvd0Nsb3NlSWNvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBjbG9zZU9uRXNjYXBlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSB2aXNpYmxlQ2hhbmdlOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICBfdmlzaWJsZTogYm9vbGVhbjtcblxuICAgIF9wb3NpdGlvbjogc3RyaW5nID0gXCJsZWZ0XCI7XG5cbiAgICBfZnVsbFNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcblxuICAgIHRyYW5zZm9ybU9wdGlvbnM6IGFueSA9IFwidHJhbnNsYXRlM2QoLTEwMCUsIDBweCwgMHB4KVwiO1xuXG4gICAgbWFzazogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBtYXNrQ2xpY2tMaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgICBkb2N1bWVudEVzY2FwZUxpc3RlbmVyOiBGdW5jdGlvbjtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cblxuICAgIHNldCB2aXNpYmxlKHZhbDpib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2YWw7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHBvc2l0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgICB9O1xuXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB2YWx1ZTtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKC0xMDAlLCAwcHgsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9IFwidHJhbnNsYXRlM2QoMTAwJSwgMHB4LCAwcHgpXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gXCJ0cmFuc2xhdGUzZCgwcHgsIDEwMCUsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKDBweCwgLTEwMCUsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGZ1bGxTY3JlZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mdWxsU2NyZWVuO1xuICAgIH1cblxuICAgIHNldCBmdWxsU2NyZWVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Z1bGxTY3JlZW4gPSB2YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUpXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ21vZGFsJywgdGhpcy5jb250YWluZXIsIHRoaXMuYmFzZVpJbmRleCB8fCB0aGlzLmNvbmZpZy56SW5kZXgubW9kYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TaG93LmVtaXQoe30pO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMub25IaWRlLmVtaXQoe30pO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZW5hYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIGlmICghdGhpcy5tYXNrKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMubWFzay5zdHlsZS56SW5kZXggPSBTdHJpbmcocGFyc2VJbnQodGhpcy5jb250YWluZXIuc3R5bGUuekluZGV4KSAtIDEpO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRNdWx0aXBsZUNsYXNzZXModGhpcy5tYXNrLCAncC1jb21wb25lbnQtb3ZlcmxheSBwLXNpZGViYXItbWFzaycpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNtaXNzaWJsZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrQ2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMubWFzaywgJ2NsaWNrJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzbWlzc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJsb2NrU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVNb2RhbGl0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICAgICAgdGhpcy51bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm1hc2spO1xuICAgICAgICAgICAgaWYgKHRoaXMuYmxvY2tTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYXNrID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQpe1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbG9zZU9uRXNjYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25FbmQoZXZlbnQpe1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb250YWluZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIsIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKSB7XG4gICAgICAgIGNvbnN0IGRvY3VtZW50VGFyZ2V0OiBhbnkgPSB0aGlzLmVsID8gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQgOiAnZG9jdW1lbnQnO1xuXG4gICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09IDI3KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMuY29udGFpbmVyLnN0eWxlLnpJbmRleCkgPT09IChEb21IYW5kbGVyLnppbmRleCArIHRoaXMuYmFzZVpJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZShldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMubWFza0NsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kR2xvYmFsTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyAmJiB0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcblx0XHR0aGlzLnVuYmluZEdsb2JhbExpc3RlbmVycygpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1NpZGViYXJdLFxuICAgIGRlY2xhcmF0aW9uczogW1NpZGViYXJdXG59KVxuZXhwb3J0IGNsYXNzIFNpZGViYXJNb2R1bGUgeyB9XG4iXX0=