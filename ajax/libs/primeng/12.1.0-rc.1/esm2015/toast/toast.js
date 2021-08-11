import { NgModule, Component, Input, Output, ViewChild, EventEmitter, ContentChildren, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { UniqueComponentId } from 'primeng/utils';
import { RippleModule } from 'primeng/ripple';
import { trigger, state, style, transition, animate, query, animateChild } from '@angular/animations';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
import * as i3 from "primeng/api";
export class ToastItem {
    constructor(zone) {
        this.zone = zone;
        this.onClose = new EventEmitter();
    }
    ngAfterViewInit() {
        this.initTimeout();
    }
    initTimeout() {
        if (!this.message.sticky) {
            this.zone.runOutsideAngular(() => {
                this.timeout = setTimeout(() => {
                    this.onClose.emit({
                        index: this.index,
                        message: this.message
                    });
                }, this.message.life || 3000);
            });
        }
    }
    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    onMouseEnter() {
        this.clearTimeout();
    }
    onMouseLeave() {
        this.initTimeout();
    }
    onCloseIconClick(event) {
        this.clearTimeout();
        this.onClose.emit({
            index: this.index,
            message: this.message
        });
        event.preventDefault();
    }
    ngOnDestroy() {
        this.clearTimeout();
    }
}
ToastItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ToastItem, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
ToastItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ToastItem, selector: "p-toastItem", inputs: { message: "message", index: "index", template: "template", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onClose: "onClose" }, viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div #container [attr.id]="message.id" [class]="message.styleClass" [ngClass]="['p-toast-message-' + message.severity, 'p-toast-message']" [@messageState]="{value: 'visible', params: {showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
            <div class="p-toast-message-content" role="alert" aria-live="assertive" aria-atomic="true"  [ngClass]="message.contentStyleClass">
                <ng-container *ngIf="!template">
                    <span [class]="'p-toast-message-icon pi' + (message.icon ? ' ' + message.icon : '')" [ngClass]="{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',
                        'pi-times-circle': message.severity == 'error', 'pi-check' :message.severity == 'success'}"></span>
                    <div class="p-toast-message-text">
                        <div class="p-toast-summary">{{message.summary}}</div>
                        <div class="p-toast-detail">{{message.detail}}</div>
                    </div>
                </ng-container>
                <ng-container *ngTemplateOutlet="template; context: {$implicit: message}"></ng-container>
                <button type="button" class="p-toast-icon-close p-link" (click)="onCloseIconClick($event)" (keydown.enter)="onCloseIconClick($event)" *ngIf="message.closable !== false" pRipple>
                    <span class="p-toast-icon-close-icon pi pi-times"></span>
                </button>
            </div>
        </div>
    `, isInline: true, directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.Ripple, selector: "[pRipple]" }], animations: [
        trigger('messageState', [
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => *', [
                style({ transform: '{{showTransformParams}}', opacity: 0 }),
                animate('{{showTransitionParams}}')
            ]),
            transition('* => void', [
                animate(('{{hideTransitionParams}}'), style({
                    height: 0,
                    opacity: 0,
                    transform: '{{hideTransformParams}}'
                }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ToastItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-toastItem',
                    template: `
        <div #container [attr.id]="message.id" [class]="message.styleClass" [ngClass]="['p-toast-message-' + message.severity, 'p-toast-message']" [@messageState]="{value: 'visible', params: {showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
            <div class="p-toast-message-content" role="alert" aria-live="assertive" aria-atomic="true"  [ngClass]="message.contentStyleClass">
                <ng-container *ngIf="!template">
                    <span [class]="'p-toast-message-icon pi' + (message.icon ? ' ' + message.icon : '')" [ngClass]="{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',
                        'pi-times-circle': message.severity == 'error', 'pi-check' :message.severity == 'success'}"></span>
                    <div class="p-toast-message-text">
                        <div class="p-toast-summary">{{message.summary}}</div>
                        <div class="p-toast-detail">{{message.detail}}</div>
                    </div>
                </ng-container>
                <ng-container *ngTemplateOutlet="template; context: {$implicit: message}"></ng-container>
                <button type="button" class="p-toast-icon-close p-link" (click)="onCloseIconClick($event)" (keydown.enter)="onCloseIconClick($event)" *ngIf="message.closable !== false" pRipple>
                    <span class="p-toast-icon-close-icon pi pi-times"></span>
                </button>
            </div>
        </div>
    `,
                    animations: [
                        trigger('messageState', [
                            state('visible', style({
                                transform: 'translateY(0)',
                                opacity: 1
                            })),
                            transition('void => *', [
                                style({ transform: '{{showTransformParams}}', opacity: 0 }),
                                animate('{{showTransitionParams}}')
                            ]),
                            transition('* => void', [
                                animate(('{{hideTransitionParams}}'), style({
                                    height: 0,
                                    opacity: 0,
                                    transform: '{{hideTransformParams}}'
                                }))
                            ])
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; }, propDecorators: { message: [{
                type: Input
            }], index: [{
                type: Input
            }], template: [{
                type: Input
            }], showTransformOptions: [{
                type: Input
            }], hideTransformOptions: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], onClose: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }] } });
export class Toast {
    constructor(messageService, cd, config) {
        this.messageService = messageService;
        this.cd = cd;
        this.config = config;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.position = 'top-right';
        this.preventOpenDuplicates = false;
        this.preventDuplicates = false;
        this.showTransformOptions = 'translateY(100%)';
        this.hideTransformOptions = 'translateY(-100%)';
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.onClose = new EventEmitter();
        this.id = UniqueComponentId();
    }
    ngOnInit() {
        this.messageSubscription = this.messageService.messageObserver.subscribe(messages => {
            if (messages) {
                if (messages instanceof Array) {
                    const filteredMessages = messages.filter(m => this.canAdd(m));
                    this.add(filteredMessages);
                }
                else if (this.canAdd(messages)) {
                    this.add([messages]);
                }
            }
        });
        this.clearSubscription = this.messageService.clearObserver.subscribe(key => {
            if (key) {
                if (this.key === key) {
                    this.messages = null;
                }
            }
            else {
                this.messages = null;
            }
            this.cd.markForCheck();
        });
    }
    ngAfterViewInit() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.containerViewChild.nativeElement, this.baseZIndex || this.config.zIndex.modal);
        }
        if (this.breakpoints) {
            this.createStyle();
        }
    }
    add(messages) {
        this.messages = this.messages ? [...this.messages, ...messages] : [...messages];
        if (this.preventDuplicates) {
            this.messagesArchieve = this.messagesArchieve ? [...this.messagesArchieve, ...messages] : [...messages];
        }
        this.cd.markForCheck();
    }
    canAdd(message) {
        let allow = this.key === message.key;
        if (allow && this.preventOpenDuplicates) {
            allow = !this.containsMessage(this.messages, message);
        }
        if (allow && this.preventDuplicates) {
            allow = !this.containsMessage(this.messagesArchieve, message);
        }
        return allow;
    }
    containsMessage(collection, message) {
        if (!collection) {
            return false;
        }
        return collection.find(m => {
            return ((m.summary === message.summary) && (m.detail == message.detail) && (m.severity === message.severity));
        }) != null;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'message':
                    this.template = item.template;
                    break;
                default:
                    this.template = item.template;
                    break;
            }
        });
    }
    onMessageClose(event) {
        this.messages.splice(event.index, 1);
        this.onClose.emit({
            message: event.message
        });
        this.cd.detectChanges();
    }
    onAnimationStart(event) {
        if (event.fromState === 'void' && this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
            this.containerViewChild.nativeElement.setAttribute(this.id, '');
        }
    }
    createStyle() {
        if (!this.styleElement) {
            this.styleElement = document.createElement('style');
            this.styleElement.type = 'text/css';
            document.head.appendChild(this.styleElement);
            let innerHTML = '';
            for (let breakpoint in this.breakpoints) {
                let breakpointStyle = '';
                for (let styleProp in this.breakpoints[breakpoint]) {
                    breakpointStyle += styleProp + ':' + this.breakpoints[breakpoint][styleProp] + ' !important;';
                }
                innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-toast[${this.id}] {
                           ${breakpointStyle}
                        }
                    }
                `;
            }
            this.styleElement.innerHTML = innerHTML;
        }
    }
    destroyStyle() {
        if (this.styleElement) {
            document.head.removeChild(this.styleElement);
            this.styleElement = null;
        }
    }
    ngOnDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.containerViewChild && this.autoZIndex) {
            ZIndexUtils.clear(this.containerViewChild.nativeElement);
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
        this.destroyStyle();
    }
}
Toast.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Toast, deps: [{ token: i3.MessageService }, { token: i0.ChangeDetectorRef }, { token: i3.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
Toast.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Toast, selector: "p-toast", inputs: { key: "key", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", style: "style", styleClass: "styleClass", position: "position", preventOpenDuplicates: "preventOpenDuplicates", preventDuplicates: "preventDuplicates", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", breakpoints: "breakpoints" }, outputs: { onClose: "onClose" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="'p-toast p-component p-toast-' + position" [ngStyle]="style" [class]="styleClass">
            <p-toastItem *ngFor="let msg of messages; let i=index" [message]="msg" [index]="i" (onClose)="onMessageClose($event)"
                    [template]="template" @toastAnimation (@toastAnimation.start)="onAnimationStart($event)"
                    [showTransformOptions]="showTransformOptions" [hideTransformOptions]="hideTransformOptions"
                    [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-toastItem>
        </div>
    `, isInline: true, styles: [".p-toast{position:fixed;width:25rem}.p-toast-message{overflow:hidden}.p-toast-message-content{display:flex;align-items:flex-start}.p-toast-message-text{flex:1 1 auto}.p-toast-top-right{top:20px;right:20px}.p-toast-top-left{top:20px;left:20px}.p-toast-bottom-left{bottom:20px;left:20px}.p-toast-bottom-right{bottom:20px;right:20px}.p-toast-top-center{top:20px;left:50%;transform:translateX(-50%)}.p-toast-bottom-center{bottom:20px;left:50%;transform:translateX(-50%)}.p-toast-center{left:50%;top:50%;min-width:20vw;transform:translate(-50%,-50%)}.p-toast-icon-close{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-toast-icon-close.p-link{cursor:pointer}"], components: [{ type: ToastItem, selector: "p-toastItem", inputs: ["message", "index", "template", "showTransformOptions", "hideTransformOptions", "showTransitionOptions", "hideTransitionOptions"], outputs: ["onClose"] }], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [
        trigger('toastAnimation', [
            transition(':enter, :leave', [
                query('@*', animateChild())
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Toast, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-toast',
                    template: `
        <div #container [ngClass]="'p-toast p-component p-toast-' + position" [ngStyle]="style" [class]="styleClass">
            <p-toastItem *ngFor="let msg of messages; let i=index" [message]="msg" [index]="i" (onClose)="onMessageClose($event)"
                    [template]="template" @toastAnimation (@toastAnimation.start)="onAnimationStart($event)"
                    [showTransformOptions]="showTransformOptions" [hideTransformOptions]="hideTransformOptions"
                    [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-toastItem>
        </div>
    `,
                    animations: [
                        trigger('toastAnimation', [
                            transition(':enter, :leave', [
                                query('@*', animateChild())
                            ])
                        ])
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./toast.css']
                }]
        }], ctorParameters: function () { return [{ type: i3.MessageService }, { type: i0.ChangeDetectorRef }, { type: i3.PrimeNGConfig }]; }, propDecorators: { key: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], position: [{
                type: Input
            }], preventOpenDuplicates: [{
                type: Input
            }], preventDuplicates: [{
                type: Input
            }], showTransformOptions: [{
                type: Input
            }], hideTransformOptions: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], breakpoints: [{
                type: Input
            }], onClose: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ToastModule {
}
ToastModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToastModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ToastModule, declarations: [Toast, ToastItem], imports: [CommonModule, RippleModule], exports: [Toast, SharedModule] });
ToastModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ToastModule, imports: [[CommonModule, RippleModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule],
                    exports: [Toast, SharedModule],
                    declarations: [Toast, ToastItem]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvdG9hc3QvdG9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBNEQsU0FBUyxFQUFDLFlBQVksRUFBQyxlQUFlLEVBQXVCLHVCQUF1QixFQUE2QixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1UCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFDN0csT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUE2QzVDLE1BQU0sT0FBTyxTQUFTO0lBc0JsQixZQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQU50QixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFNdkIsQ0FBQztJQUVwQyxlQUFlO1FBQ1gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUM3QixJ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RUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBRUcsaUJBQWlCO3NCQUF6QixLQUFLO2dCQUVHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFFRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBRUcscUJBQXFCO3NCQUE3QixLQUFLO2dCQUVHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVJLE9BQU87c0JBQWhCLE1BQU07Z0JBRWlCLGtCQUFrQjtzQkFBekMsU0FBUzt1QkFBQyxXQUFXO2dCQUVVLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTs7QUE2S2xDLE1BQU0sT0FBTyxXQUFXOzt3R0FBWCxXQUFXO3lHQUFYLFdBQVcsaUJBN01YLEtBQUssRUE3RkwsU0FBUyxhQXNTUixZQUFZLEVBQUMsWUFBWSxhQXpNMUIsS0FBSyxFQTBNRSxZQUFZO3lHQUduQixXQUFXLFlBSlgsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLEVBQ3BCLFlBQVk7MkZBR25CLFdBQVc7a0JBTHZCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztvQkFDcEMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFDLFlBQVksQ0FBQztvQkFDN0IsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFDLFNBQVMsQ0FBQztpQkFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxPdXRwdXQsT25Jbml0LEFmdGVyVmlld0luaXQsQWZ0ZXJDb250ZW50SW5pdCxPbkRlc3Ryb3ksRWxlbWVudFJlZixWaWV3Q2hpbGQsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZHJlbixRdWVyeUxpc3QsVGVtcGxhdGVSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE5nWm9uZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNZXNzYWdlLCBQcmltZU5HQ29uZmlnfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7UHJpbWVUZW1wbGF0ZSxTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7VW5pcXVlQ29tcG9uZW50SWR9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHtSaXBwbGVNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUscXVlcnksYW5pbWF0ZUNoaWxkLEFuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IFpJbmRleFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10b2FzdEl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbYXR0ci5pZF09XCJtZXNzYWdlLmlkXCIgW2NsYXNzXT1cIm1lc3NhZ2Uuc3R5bGVDbGFzc1wiIFtuZ0NsYXNzXT1cIlsncC10b2FzdC1tZXNzYWdlLScgKyBtZXNzYWdlLnNldmVyaXR5LCAncC10b2FzdC1tZXNzYWdlJ11cIiBbQG1lc3NhZ2VTdGF0ZV09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zZm9ybVBhcmFtczogc2hvd1RyYW5zZm9ybU9wdGlvbnMsIGhpZGVUcmFuc2Zvcm1QYXJhbXM6IGhpZGVUcmFuc2Zvcm1PcHRpb25zLCBzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIlxuICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cIm9uTW91c2VFbnRlcigpXCIgKG1vdXNlbGVhdmUpPVwib25Nb3VzZUxlYXZlKClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRvYXN0LW1lc3NhZ2UtY29udGVudFwiIHJvbGU9XCJhbGVydFwiIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiIGFyaWEtYXRvbWljPVwidHJ1ZVwiICBbbmdDbGFzc109XCJtZXNzYWdlLmNvbnRlbnRTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0ZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiJ3AtdG9hc3QtbWVzc2FnZS1pY29uIHBpJyArIChtZXNzYWdlLmljb24gPyAnICcgKyBtZXNzYWdlLmljb24gOiAnJylcIiBbbmdDbGFzc109XCJ7J3BpLWluZm8tY2lyY2xlJzogbWVzc2FnZS5zZXZlcml0eSA9PSAnaW5mbycsICdwaS1leGNsYW1hdGlvbi10cmlhbmdsZSc6IG1lc3NhZ2Uuc2V2ZXJpdHkgPT0gJ3dhcm4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3BpLXRpbWVzLWNpcmNsZSc6IG1lc3NhZ2Uuc2V2ZXJpdHkgPT0gJ2Vycm9yJywgJ3BpLWNoZWNrJyA6bWVzc2FnZS5zZXZlcml0eSA9PSAnc3VjY2Vzcyd9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10b2FzdC1tZXNzYWdlLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRvYXN0LXN1bW1hcnlcIj57e21lc3NhZ2Uuc3VtbWFyeX19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10b2FzdC1kZXRhaWxcIj57e21lc3NhZ2UuZGV0YWlsfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBtZXNzYWdlfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicC10b2FzdC1pY29uLWNsb3NlIHAtbGlua1wiIChjbGljayk9XCJvbkNsb3NlSWNvbkNsaWNrKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJvbkNsb3NlSWNvbkNsaWNrKCRldmVudClcIiAqbmdJZj1cIm1lc3NhZ2UuY2xvc2FibGUgIT09IGZhbHNlXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXRvYXN0LWljb24tY2xvc2UtaWNvbiBwaSBwaS10aW1lc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignbWVzc2FnZVN0YXRlJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd7e3Nob3dUcmFuc2Zvcm1QYXJhbXN9fScsIG9wYWNpdHk6IDB9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScpLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAne3toaWRlVHJhbnNmb3JtUGFyYW1zfX0nXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdEl0ZW0gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbWVzc2FnZTogTWVzc2FnZTtcblxuICAgIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2Zvcm1PcHRpb25zOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNmb3JtT3B0aW9uczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIHRpbWVvdXQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmluaXRUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgaW5pdFRpbWVvdXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5tZXNzYWdlLnN0aWNreSkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5tZXNzYWdlLmxpZmUgfHwgMzAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyVGltZW91dCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZUVudGVyKCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICAgIH1cblxuICAgIG9uTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5pbml0VGltZW91dCgpO1xuICAgIH1cblxuICAgIG9uQ2xvc2VJY29uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZVxuICAgICAgICB9KTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRvYXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwiJ3AtdG9hc3QgcC1jb21wb25lbnQgcC10b2FzdC0nICsgcG9zaXRpb25cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8cC10b2FzdEl0ZW0gKm5nRm9yPVwibGV0IG1zZyBvZiBtZXNzYWdlczsgbGV0IGk9aW5kZXhcIiBbbWVzc2FnZV09XCJtc2dcIiBbaW5kZXhdPVwiaVwiIChvbkNsb3NlKT1cIm9uTWVzc2FnZUNsb3NlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbdGVtcGxhdGVdPVwidGVtcGxhdGVcIiBAdG9hc3RBbmltYXRpb24gKEB0b2FzdEFuaW1hdGlvbi5zdGFydCk9XCJvbkFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbc2hvd1RyYW5zZm9ybU9wdGlvbnNdPVwic2hvd1RyYW5zZm9ybU9wdGlvbnNcIiBbaGlkZVRyYW5zZm9ybU9wdGlvbnNdPVwiaGlkZVRyYW5zZm9ybU9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICBbc2hvd1RyYW5zaXRpb25PcHRpb25zXT1cInNob3dUcmFuc2l0aW9uT3B0aW9uc1wiIFtoaWRlVHJhbnNpdGlvbk9wdGlvbnNdPVwiaGlkZVRyYW5zaXRpb25PcHRpb25zXCI+PC9wLXRvYXN0SXRlbT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3RvYXN0QW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbignOmVudGVyLCA6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgcXVlcnkoJ0AqJywgYW5pbWF0ZUNoaWxkKCkpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi90b2FzdC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdCBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlckNvbnRlbnRJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBrZXk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwb3NpdGlvbjogc3RyaW5nID0gJ3RvcC1yaWdodCc7XG5cbiAgICBASW5wdXQoKSBwcmV2ZW50T3BlbkR1cGxpY2F0ZXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHByZXZlbnREdXBsaWNhdGVzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNmb3JtT3B0aW9uczogc3RyaW5nID0gJ3RyYW5zbGF0ZVkoMTAwJSknO1xuXG4gICAgQElucHV0KCkgaGlkZVRyYW5zZm9ybU9wdGlvbnM6IHN0cmluZyA9ICd0cmFuc2xhdGVZKC0xMDAlKSc7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICczMDBtcyBlYXNlLW91dCc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcyNTBtcyBlYXNlLWluJztcblxuICAgIEBJbnB1dCgpIGJyZWFrcG9pbnRzOiBhbnk7XG5cbiAgICBAT3V0cHV0KCkgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBtZXNzYWdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjbGVhclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VbXTtcblxuICAgIG1lc3NhZ2VzQXJjaGlldmU6IE1lc3NhZ2VbXTtcblxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcpIHt9XG5cbiAgICBzdHlsZUVsZW1lbnQ6IGFueTtcblxuICAgIGlkOiBzdHJpbmcgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZVN1YnNjcmlwdGlvbiA9IHRoaXMubWVzc2FnZVNlcnZpY2UubWVzc2FnZU9ic2VydmVyLnN1YnNjcmliZShtZXNzYWdlcyA9PiB7XG4gICAgICAgICAgICBpZiAobWVzc2FnZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZE1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKG0gPT4gdGhpcy5jYW5BZGQobSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZChmaWx0ZXJlZE1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jYW5BZGQobWVzc2FnZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKFttZXNzYWdlc10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jbGVhclN1YnNjcmlwdGlvbiA9IHRoaXMubWVzc2FnZVNlcnZpY2UuY2xlYXJPYnNlcnZlci5zdWJzY3JpYmUoa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ21vZGFsJywgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgdGhpcy5iYXNlWkluZGV4IHx8IHRoaXMuY29uZmlnLnpJbmRleC5tb2RhbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU3R5bGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChtZXNzYWdlczogTWVzc2FnZVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSB0aGlzLm1lc3NhZ2VzID8gWy4uLnRoaXMubWVzc2FnZXMsIC4uLm1lc3NhZ2VzXSA6IFsuLi5tZXNzYWdlc107XG5cbiAgICAgICAgaWYgKHRoaXMucHJldmVudER1cGxpY2F0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXNBcmNoaWV2ZSA9IHRoaXMubWVzc2FnZXNBcmNoaWV2ZSA/IFsuLi50aGlzLm1lc3NhZ2VzQXJjaGlldmUsIC4uLm1lc3NhZ2VzXSA6IFsuLi5tZXNzYWdlc107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGNhbkFkZChtZXNzYWdlOiBNZXNzYWdlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBhbGxvdyA9IHRoaXMua2V5ID09PSBtZXNzYWdlLmtleTtcblxuICAgICAgICBpZiAoYWxsb3cgJiYgdGhpcy5wcmV2ZW50T3BlbkR1cGxpY2F0ZXMpIHtcbiAgICAgICAgICAgIGFsbG93ID0gIXRoaXMuY29udGFpbnNNZXNzYWdlKHRoaXMubWVzc2FnZXMsIG1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFsbG93ICYmIHRoaXMucHJldmVudER1cGxpY2F0ZXMpIHtcbiAgICAgICAgICAgIGFsbG93ID0gIXRoaXMuY29udGFpbnNNZXNzYWdlKHRoaXMubWVzc2FnZXNBcmNoaWV2ZSwgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWxsb3c7XG4gICAgfVxuXG4gICAgY29udGFpbnNNZXNzYWdlKGNvbGxlY3Rpb246IE1lc3NhZ2VbXSwgbWVzc2FnZTogTWVzc2FnZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbmQobSA9PiB7XG4gICAgICAgICAgIHJldHVybiAoKG0uc3VtbWFyeSA9PT0gbWVzc2FnZS5zdW1tYXJ5KSAmJiAobS5kZXRhaWwgPT0gbWVzc2FnZS5kZXRhaWwpICYmIChtLnNldmVyaXR5ID09PSBtZXNzYWdlLnNldmVyaXR5KSk7XG4gICAgICAgIH0pICE9IG51bGw7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25NZXNzYWdlQ2xvc2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcy5zcGxpY2UoZXZlbnQuaW5kZXgsIDEpO1xuXG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGV2ZW50Lm1lc3NhZ2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmZyb21TdGF0ZSA9PT0gJ3ZvaWQnICYmIHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKHRoaXMuaWQsICcnKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlU3R5bGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0aGlzLnN0eWxlRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBmb3IgKGxldCBicmVha3BvaW50IGluIHRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgICAgICBsZXQgYnJlYWtwb2ludFN0eWxlID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc3R5bGVQcm9wIGluIHRoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludFN0eWxlICs9IHN0eWxlUHJvcCArICc6JyArIHRoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF1bc3R5bGVQcm9wXSArICcgIWltcG9ydGFudDsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke2JyZWFrcG9pbnR9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAucC10b2FzdFske3RoaXMuaWR9XSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAke2JyZWFrcG9pbnRTdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzdHJveVN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5zdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQodGhpcy5zdHlsZUVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyVmlld0NoaWxkICYmIHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jbGVhclN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jbGVhclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXN0cm95U3R5bGUoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxSaXBwbGVNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtUb2FzdCxTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1RvYXN0LFRvYXN0SXRlbV1cbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RNb2R1bGUgeyB9XG4iXX0=