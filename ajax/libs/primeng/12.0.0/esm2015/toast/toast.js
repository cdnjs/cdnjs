import { NgModule, Component, Input, Output, ViewChild, EventEmitter, ContentChildren, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { UniqueComponentId } from 'primeng/utils';
import { RippleModule } from 'primeng/ripple';
import { trigger, state, style, transition, animate, query, animateChild } from '@angular/animations';
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
ToastItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToastItem, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
ToastItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: ToastItem, selector: "p-toastItem", inputs: { message: "message", index: "index", template: "template", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onClose: "onClose" }, viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToastItem, decorators: [{
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
    constructor(messageService, cd) {
        this.messageService = messageService;
        this.cd = cd;
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
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
        this.destroyStyle();
    }
}
Toast.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Toast, deps: [{ token: i3.MessageService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Toast.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Toast, selector: "p-toast", inputs: { key: "key", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", style: "style", styleClass: "styleClass", position: "position", preventOpenDuplicates: "preventOpenDuplicates", preventDuplicates: "preventDuplicates", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", breakpoints: "breakpoints" }, outputs: { onClose: "onClose" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Toast, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i3.MessageService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { key: [{
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
ToastModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToastModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToastModule, declarations: [Toast, ToastItem], imports: [CommonModule, RippleModule], exports: [Toast, SharedModule] });
ToastModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToastModule, imports: [[CommonModule, RippleModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule],
                    exports: [Toast, SharedModule],
                    declarations: [Toast, ToastItem]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvdG9hc3QvdG9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBNEQsU0FBUyxFQUFDLFlBQVksRUFBQyxlQUFlLEVBQXVCLHVCQUF1QixFQUE2QixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1UCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBNkM3RyxNQUFNLE9BQU8sU0FBUztJQXNCbEIsWUFBb0IsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFOdEIsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBTXZCLENBQUM7SUFFcEMsZUFBZTtRQUNYLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO29C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QUssRUE3RkwsU0FBUyxhQThSUixZQUFZLEVBQUMsWUFBWSxhQWpNMUIsS0FBSyxFQWtNRSxZQUFZO3lHQUduQixXQUFXLFlBSlgsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLEVBQ3BCLFlBQVk7MkZBR25CLFdBQVc7a0JBTHZCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztvQkFDcEMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFDLFlBQVksQ0FBQztvQkFDN0IsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFDLFNBQVMsQ0FBQztpQkFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxPdXRwdXQsT25Jbml0LEFmdGVyVmlld0luaXQsQWZ0ZXJDb250ZW50SW5pdCxPbkRlc3Ryb3ksRWxlbWVudFJlZixWaWV3Q2hpbGQsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZHJlbixRdWVyeUxpc3QsVGVtcGxhdGVSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE5nWm9uZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7UHJpbWVUZW1wbGF0ZSxTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7VW5pcXVlQ29tcG9uZW50SWR9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHtSaXBwbGVNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUscXVlcnksYW5pbWF0ZUNoaWxkLEFuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRvYXN0SXRlbScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFthdHRyLmlkXT1cIm1lc3NhZ2UuaWRcIiBbY2xhc3NdPVwibWVzc2FnZS5zdHlsZUNsYXNzXCIgW25nQ2xhc3NdPVwiWydwLXRvYXN0LW1lc3NhZ2UtJyArIG1lc3NhZ2Uuc2V2ZXJpdHksICdwLXRvYXN0LW1lc3NhZ2UnXVwiIFtAbWVzc2FnZVN0YXRlXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNmb3JtUGFyYW1zOiBzaG93VHJhbnNmb3JtT3B0aW9ucywgaGlkZVRyYW5zZm9ybVBhcmFtczogaGlkZVRyYW5zZm9ybU9wdGlvbnMsIHNob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib25Nb3VzZUVudGVyKClcIiAobW91c2VsZWF2ZSk9XCJvbk1vdXNlTGVhdmUoKVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdG9hc3QtbWVzc2FnZS1jb250ZW50XCIgcm9sZT1cImFsZXJ0XCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCIgYXJpYS1hdG9taWM9XCJ0cnVlXCIgIFtuZ0NsYXNzXT1cIm1lc3NhZ2UuY29udGVudFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCIncC10b2FzdC1tZXNzYWdlLWljb24gcGknICsgKG1lc3NhZ2UuaWNvbiA/ICcgJyArIG1lc3NhZ2UuaWNvbiA6ICcnKVwiIFtuZ0NsYXNzXT1cInsncGktaW5mby1jaXJjbGUnOiBtZXNzYWdlLnNldmVyaXR5ID09ICdpbmZvJywgJ3BpLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJzogbWVzc2FnZS5zZXZlcml0eSA9PSAnd2FybicsXG4gICAgICAgICAgICAgICAgICAgICAgICAncGktdGltZXMtY2lyY2xlJzogbWVzc2FnZS5zZXZlcml0eSA9PSAnZXJyb3InLCAncGktY2hlY2snIDptZXNzYWdlLnNldmVyaXR5ID09ICdzdWNjZXNzJ31cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRvYXN0LW1lc3NhZ2UtdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdG9hc3Qtc3VtbWFyeVwiPnt7bWVzc2FnZS5zdW1tYXJ5fX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRvYXN0LWRldGFpbFwiPnt7bWVzc2FnZS5kZXRhaWx9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG1lc3NhZ2V9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwLXRvYXN0LWljb24tY2xvc2UgcC1saW5rXCIgKGNsaWNrKT1cIm9uQ2xvc2VJY29uQ2xpY2soJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cIm9uQ2xvc2VJY29uQ2xpY2soJGV2ZW50KVwiICpuZ0lmPVwibWVzc2FnZS5jbG9zYWJsZSAhPT0gZmFsc2VcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtdG9hc3QtaWNvbi1jbG9zZS1pY29uIHBpIHBpLXRpbWVzXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdtZXNzYWdlU3RhdGUnLCBbXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3t7c2hvd1RyYW5zZm9ybVBhcmFtc319Jywgb3BhY2l0eTogMH0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JyksIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd7e2hpZGVUcmFuc2Zvcm1QYXJhbXN9fSdcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0SXRlbSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBtZXNzYWdlOiBNZXNzYWdlO1xuXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCkgc2hvd1RyYW5zZm9ybU9wdGlvbnM6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2Zvcm1PcHRpb25zOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgdGltZW91dDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFRpbWVvdXQoKTtcbiAgICB9XG5cbiAgICBpbml0VGltZW91dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2Uuc3RpY2t5KSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzLm1lc3NhZ2UubGlmZSB8fCAzMDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KCkge1xuICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRW50ZXIoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgb25Nb3VzZUxlYXZlKCkge1xuICAgICAgICB0aGlzLmluaXRUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgb25DbG9zZUljb25DbGljayhldmVudCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KHtcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdG9hc3QnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCIncC10b2FzdCBwLWNvbXBvbmVudCBwLXRvYXN0LScgKyBwb3NpdGlvblwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxwLXRvYXN0SXRlbSAqbmdGb3I9XCJsZXQgbXNnIG9mIG1lc3NhZ2VzOyBsZXQgaT1pbmRleFwiIFttZXNzYWdlXT1cIm1zZ1wiIFtpbmRleF09XCJpXCIgKG9uQ2xvc2UpPVwib25NZXNzYWdlQ2xvc2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFt0ZW1wbGF0ZV09XCJ0ZW1wbGF0ZVwiIEB0b2FzdEFuaW1hdGlvbiAoQHRvYXN0QW5pbWF0aW9uLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtzaG93VHJhbnNmb3JtT3B0aW9uc109XCJzaG93VHJhbnNmb3JtT3B0aW9uc1wiIFtoaWRlVHJhbnNmb3JtT3B0aW9uc109XCJoaWRlVHJhbnNmb3JtT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgIFtzaG93VHJhbnNpdGlvbk9wdGlvbnNdPVwic2hvd1RyYW5zaXRpb25PcHRpb25zXCIgW2hpZGVUcmFuc2l0aW9uT3B0aW9uc109XCJoaWRlVHJhbnNpdGlvbk9wdGlvbnNcIj48L3AtdG9hc3RJdGVtPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcigndG9hc3RBbmltYXRpb24nLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXIsIDpsZWF2ZScsIFtcbiAgICAgICAgICAgICAgICBxdWVyeSgnQConLCBhbmltYXRlQ2hpbGQoKSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3RvYXN0LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0IGltcGxlbWVudHMgT25Jbml0LEFmdGVyQ29udGVudEluaXQsT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBvc2l0aW9uOiBzdHJpbmcgPSAndG9wLXJpZ2h0JztcblxuICAgIEBJbnB1dCgpIHByZXZlbnRPcGVuRHVwbGljYXRlczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgcHJldmVudER1cGxpY2F0ZXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2Zvcm1PcHRpb25zOiBzdHJpbmcgPSAndHJhbnNsYXRlWSgxMDAlKSc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNmb3JtT3B0aW9uczogc3RyaW5nID0gJ3RyYW5zbGF0ZVkoLTEwMCUpJztcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzMwMG1zIGVhc2Utb3V0JztcblxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzI1MG1zIGVhc2UtaW4nO1xuXG4gICAgQElucHV0KCkgYnJlYWtwb2ludHM6IGFueTtcblxuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIG1lc3NhZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNsZWFyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBtZXNzYWdlczogTWVzc2FnZVtdO1xuXG4gICAgbWVzc2FnZXNBcmNoaWV2ZTogTWVzc2FnZVtdO1xuXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBzdHlsZUVsZW1lbnQ6IGFueTtcblxuICAgIGlkOiBzdHJpbmcgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlU3Vic2NyaXB0aW9uID0gdGhpcy5tZXNzYWdlU2VydmljZS5tZXNzYWdlT2JzZXJ2ZXIuc3Vic2NyaWJlKG1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcykge1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkTWVzc2FnZXMgPSBtZXNzYWdlcy5maWx0ZXIobSA9PiB0aGlzLmNhbkFkZChtKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKGZpbHRlcmVkTWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNhbkFkZChtZXNzYWdlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGQoW21lc3NhZ2VzXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNsZWFyU3Vic2NyaXB0aW9uID0gdGhpcy5tZXNzYWdlU2VydmljZS5jbGVhck9ic2VydmVyLnN1YnNjcmliZShrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGlmICh0aGlzLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGQobWVzc2FnZXM6IE1lc3NhZ2VbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gdGhpcy5tZXNzYWdlcyA/IFsuLi50aGlzLm1lc3NhZ2VzLCAuLi5tZXNzYWdlc10gOiBbLi4ubWVzc2FnZXNdO1xuXG4gICAgICAgIGlmICh0aGlzLnByZXZlbnREdXBsaWNhdGVzKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VzQXJjaGlldmUgPSB0aGlzLm1lc3NhZ2VzQXJjaGlldmUgPyBbLi4udGhpcy5tZXNzYWdlc0FyY2hpZXZlLCAuLi5tZXNzYWdlc10gOiBbLi4ubWVzc2FnZXNdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBjYW5BZGQobWVzc2FnZTogTWVzc2FnZSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgYWxsb3cgPSB0aGlzLmtleSA9PT0gbWVzc2FnZS5rZXk7XG5cbiAgICAgICAgaWYgKGFsbG93ICYmIHRoaXMucHJldmVudE9wZW5EdXBsaWNhdGVzKSB7XG4gICAgICAgICAgICBhbGxvdyA9ICF0aGlzLmNvbnRhaW5zTWVzc2FnZSh0aGlzLm1lc3NhZ2VzLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbGxvdyAmJiB0aGlzLnByZXZlbnREdXBsaWNhdGVzKSB7XG4gICAgICAgICAgICBhbGxvdyA9ICF0aGlzLmNvbnRhaW5zTWVzc2FnZSh0aGlzLm1lc3NhZ2VzQXJjaGlldmUsIG1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFsbG93O1xuICAgIH1cblxuICAgIGNvbnRhaW5zTWVzc2FnZShjb2xsZWN0aW9uOiBNZXNzYWdlW10sIG1lc3NhZ2U6IE1lc3NhZ2UpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5maW5kKG0gPT4ge1xuICAgICAgICAgICByZXR1cm4gKChtLnN1bW1hcnkgPT09IG1lc3NhZ2Uuc3VtbWFyeSkgJiYgKG0uZGV0YWlsID09IG1lc3NhZ2UuZGV0YWlsKSAmJiAobS5zZXZlcml0eSA9PT0gbWVzc2FnZS5zZXZlcml0eSkpO1xuICAgICAgICB9KSAhPSBudWxsO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTWVzc2FnZUNsb3NlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMuc3BsaWNlKGV2ZW50LmluZGV4LCAxKTtcblxuICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBldmVudC5tZXNzYWdlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5mcm9tU3RhdGUgPT09ICd2b2lkJyAmJiB0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLmlkLCAnJyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVN0eWxlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5zdHlsZUVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IGlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgZm9yIChsZXQgYnJlYWtwb2ludCBpbiB0aGlzLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJyZWFrcG9pbnRTdHlsZSA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHN0eWxlUHJvcCBpbiB0aGlzLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRTdHlsZSArPSBzdHlsZVByb3AgKyAnOicgKyB0aGlzLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdW3N0eWxlUHJvcF0gKyAnICFpbXBvcnRhbnQ7JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHticmVha3BvaW50fSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLnAtdG9hc3RbJHt0aGlzLmlkfV0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJHticmVha3BvaW50U3R5bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lTdHlsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5tZXNzYWdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNsZWFyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc3Ryb3lTdHlsZSgpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1RvYXN0LFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbVG9hc3QsVG9hc3RJdGVtXVxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdE1vZHVsZSB7IH1cbiJdfQ==